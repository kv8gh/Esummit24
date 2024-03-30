import { connectMongoDB } from "@/lib/mongodb";
import { Event2 } from "@/models/event2.model";
import { Users } from "@/models/user.model";
import { NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";
import { getTokenDetails } from "../../../../utils/authuser";
///
export async function POST(req) {
  try {
    await connectMongoDB();

    const token = await getToken({ req });
    const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization').split(' ')[1];
    let userId = await getTokenDetails(auth);

    const user = await Users.findById(userId);

    if (user.event2TeamRole !== 1) {
      return NextResponse.json({
        message: "Leader cant leave the team",
      }, { status: 503 });
    }

    if (!user.event2TeamId) {
      return NextResponse.json({
        message: "User is not part of any team",
      }, { status: 504 });
    }

    const team = await Event2.findById(user.event2TeamId);
    if (!team) {
      return NextResponse.json({
        message: "Team not found",
      }, { status: 505 });
    }

    team.members.pull(userId);

    await team.save();

    await Users.findByIdAndUpdate(userId, {
      $set: { event2TeamId: null, event2TeamRole: -1 },
    });

    return NextResponse.json({
      message: "User has left the team successfully ",
      teamDetails: team,
    }, { status: 200 });

  } catch (error) {
    console.log("An error occurred:", error);
    return NextResponse.json({
      message: "Error occurred "}, { status:500 });
  }
}
