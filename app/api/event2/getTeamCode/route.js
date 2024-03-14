import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Event2 } from "@/models/event2.model";
import { getTokenDetails } from "@/utils/authuser";
import { TeamToken } from "@/models/teamToken";
import { customAlphabet } from "nanoid";
import { getToken } from "next-auth/jwt";

export async function POST(req, { params }) {
  try {
    await connectMongoDB();

    const token = await getToken({req})
    const auth = token ? token.accessTokenFromBackend : null
    let userId = await getTokenDetails(auth);

    // console.log(userId);
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
      const newToken = await new TeamToken({
        teamId: team._id,
        token: teamCode,
        createdAt: new Date(),
      }).save();

      await TeamModel.findOneAndUpdate(
        { _id: team._id },
        { $set: { teamCode: teamCode } }
      );

      return NextResponse.json({ teamCode: teamCode, teamName: team.teamName });
    } else {
      const token = await TeamToken.findOne({ teamId: team._id });

      if (!token) {
        return NextResponse.json({ message: "Token not found" });
      }
      const currentTime = new Date();
      const tokenCreationTime = token.createdAt;
      const timeDifference = (currentTime - tokenCreationTime) / (1000 * 60);
      console.log("-====", tokenCreationTime);
      console.log("-====", currentTime);
      if (timeDifference > 10) {
        const newTeamCode = customAlphabet(
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          10
        )();
        await TeamToken.findOneAndUpdate(
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
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "Error occurred ", status: 500 });
  }
}
