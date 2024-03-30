import { connectMongoDB } from "@/lib/mongodb";
import { Event2 } from "@/models/event2.model";
import { event2TeamToken } from "@/models/event2TeamToken";
import { getTokenDetails } from "@/utils/authuser";
import { customAlphabet } from "nanoid";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectMongoDB();

    const token = await getToken({req})
    const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization').split(' ')[1]
    let userId = await getTokenDetails(auth);
    const team = await Event2.findOne({ teamLeaderId: userId });
    if (!team) {
      return NextResponse.json({ message: "Team Not found" });
    }

    if (!team.teamCode) {
      const teamCode = customAlphabet(
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        10
      )();
      // const teamCode = nanoid(10)
      const newToken = await new event2TeamToken({
        teamId: team._id,
        token: teamCode,
        createdAt: new Date(),
      }).save();

      await Event2.findOneAndUpdate(
        { _id: team._id },
        { $set: { teamCode: teamCode } }
      );

      return NextResponse.json({ teamCode: teamCode, teamName: team.teamName });
    } else {
      const token = await event2TeamToken.findOne({ teamId: team._id });

      if (!token) {
        return NextResponse.json({ message: "Token not found" });
      }
      const currentTime = new Date();
      const tokenCreationTime = token.createdAt;
      const timeDifference = (currentTime - tokenCreationTime) / (1000 * 60);
      if (timeDifference > 10) {
        const newTeamCode = customAlphabet(
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          10
        )();
        await event2TeamToken.findOneAndUpdate(
          { teamId: team._id },
          { $set: { token: newTeamCode, createdAt: currentTime } }
        );
        await Event2.findOneAndUpdate(
          { _id: team._id },
          { $set: { teamCode: newTeamCode } }
        );

        return NextResponse.json({
          teamCode: newTeamCode,
          teamName: team.teamName,
        });
      } else {
        return NextResponse.json({
          teamCode: token.token,
          teamName: team.teamName,
        });
      }
    }
  } catch (error) {
    console.log("An error occurred:", error);
    return NextResponse.json({ message: error,}, {status: 500 });
  }
}
