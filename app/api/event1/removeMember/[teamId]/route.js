import { connectMongoDB } from "@/lib/mongodb";


import { NextResponse } from "next/server";
import { Users } from "@/models/user.model";

import { getToken } from "next-auth/jwt";
import { getTokenDetails } from "../../../../../utils/authuser";
import { Event1 } from "@/models/event1.model";

export async function POST(req, { params }) {
  try {
    console.log("me idhr hu");
    await connectMongoDB();

    const token = await getToken({req})
    const auth = token ? token.accessTokenFromBackend : null
    let userId = await getTokenDetails(auth);

    const user1=await Users.findById(userId);
    console.log("]]]]]]",user1);

    const teamId = params.teamId;
    const team = await Event1.findById({ _id: teamId });
    console.log("______",team);

    if (!team) {
      console.log("here1");
      return NextResponse.json({ message: "Invalid teamId to remove", status: 200 });
    }

    const userToRemove = await Users.findById({ _id: userId });
    if (!userToRemove) {
      console.log("here2");
      return NextResponse.json({ message: "UserID is invalid", status: 200 });
    }

    if (team.teamLeaderId.toString() !== userId) {
      console.log("here3");
      return NextResponse.json({
        
        message: "User doesn't belong to the team or user isn't a leader",
        status: 200,
      });
    }

    if (
      userToRemove.
      event1TeamId == null ||
      userToRemove.
      event1TeamId.toString() !== teamId
    ) {
      console.log("here88")
      return NextResponse.json({
        message: "User to remove and TeamId didnt Match",
      });
    }
    console.log("================")
    await Users.findOneAndUpdate(
      { _id: userId },
      { event1TeamId: null, event1TeamRole
        : -1 }
    );

    //updating team
    await Event1.findOneAndUpdate(
      { _id: teamId },
      { $pull: { members: req.body.userId } }
    );

    return NextResponse.json({
      message: "Team member removed successfully",
      status: 200,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "Error occurred ", status: 500 });
  }
}
