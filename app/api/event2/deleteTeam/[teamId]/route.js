import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { UsersDetails } from "@/models/Userdetails";
import { Event2 } from "@/models/event2.model";
import { generateTokens } from "../../../login/generateTokensTeam/route";
import { getTokenDetails } from "@/utils/authuser";
import { TeamToken } from "@/models/teamToken";
import { Users } from "@/models/user";

export async function POST(req, { params }) {
  try {
    await connectMongoDB();
    const headers = req.headers;

    const auth = req.headers.get("authorization").split(" ")[1];

    let userId = await getTokenDetails(auth);

    const teamId = params.teamId;
    const team = await Event2.findById({ _id: teamId });
    console.log(team);

    if (!team) {
      return res.status(401).json({
        message: "Invalid TeamId",
      });
    }

    if (team.teamLeaderId.toString() !== userId) {
      return NextResponse.json({
        message: "User do not belong to the team or the user is not a leader",
        status: 200,
      });
    }

    if (team.members.length !== 1) {
      return NextResponse.json({
        message: "Team Size more than 1",
        status: 200,
      });
    }

    await Event2.findOneAndDelete({
      _id: teamId,
    });

    await TeamToken.findOneAndDelete({
      teamId: teamId,
    });

    await UsersDetails.findByIdAndUpdate(
      { _id: userId },
      { teamId: null, teamRole: null }
    );

    /*
        const deletedTeam = await Event2.deleteOne({teamName:teamName});
        console.log(deletedTeam)
        */

    return NextResponse.json({ message: "Team deleted", status: 200 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "Error occurred ", status: 500 });
  }
}