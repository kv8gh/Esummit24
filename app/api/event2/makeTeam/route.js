import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { UsersDetails } from "@/models/Userdetails";
import { Event2 } from "@/models/event2.model";
import { Users } from "@/models/user";

<<<<<<< Updated upstream
import { getTokenDetails } from "../../../../utils/authuser";
import { generateTokens } from "../../login/generateTokensTeam/route";
=======
import {Users} from "@/models/user"
import {getTokenDetails} from "../../../../utils/authuser"
>>>>>>> Stashed changes

export async function POST(req) {
  try {
    await connectMongoDB();
    const headers = req.headers;

    const auth = req.headers.get("authorization").split(" ")[1];

    let userId = await getTokenDetails(auth);
    console.log(userId);

    const user = await UsersDetails.findById({ _id: userId });

    console.log(user);

    const { teamName } = await req.json();
    const team = await Event2.findOne({ teamName: teamName });
    if (team) {
      return NextResponse.json({
        message: "Team Already registered ",
        status: 200,
      });
    }
    // console.log(teamName)
    const newTeam = await new Event2({
      teamName: teamName,
      teamLeaderId: userId,
      members: [userId],
    }).save();

    await UsersDetails.findByIdAndUpdate(
      { _id: userId },
      { $set: { teamId: newTeam._id } }
    );

    const { accessToken, refreshToken } = await generateTokens(newTeam);
    //console.log(accessToken);
    //console.log(refreshToken);

    return NextResponse.json({ message: "Team Details entered ", status: 200 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "Error occurred ", status: 500 });
  }
}
