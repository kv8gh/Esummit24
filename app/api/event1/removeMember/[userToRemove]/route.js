import { connectMongoDB } from "@/lib/mongodb";


import { NextResponse } from "next/server";
import { Users } from "@/models/user.model";

import { getToken } from "next-auth/jwt";
import { getTokenDetails } from "../../../../../utils/authuser";
import { Event1 } from "@/models/event1.model";

export async function POST(req, { params }) {
  try {
    await connectMongoDB();

    const token = await getToken({req})
    const auth = token ? token.accessTokenFromBackend : null
    let leaderId = await getTokenDetails(auth);

    const leader = await Users.findById(leaderId);

    if (leader.event1TeamRole !== 0) {
      return NextResponse.json({
        message: "You are not authorized to remove a member",
        status: 401,
      });
    }

    const userToRemoveId = params.userToRemove;

    if (!userToRemoveId) {
      return NextResponse.json({ message: "Invalid userID to remove", status: 204 });
    }

    const userToRemove = await Users.findById(userToRemoveId);

    console.log('asdfasdf', userToRemove.event1TeamId, leader.event1TeamId.toString())

    if (userToRemove.event1TeamId == null ||
      userToRemove.event1TeamId.toString() !== leader.event1TeamId.toString()) {
      return NextResponse.json({
        message: "UserId given is not part of the team",
      });
    }

    await Users.findOneAndUpdate(
      { _id: userToRemoveId },
      { event1TeamId: null, event1TeamRole: -1 }
    );

    await Event1.findOneAndUpdate(
      { _id: leader.event1TeamId },
      { $pull: { members: userToRemoveId } }
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
