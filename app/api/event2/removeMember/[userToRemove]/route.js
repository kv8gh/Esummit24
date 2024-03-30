import { connectMongoDB } from "@/lib/mongodb";


import { Users } from "@/models/user.model";
import { NextResponse } from "next/server";

import { Event2 } from "@/models/event2.model";
import { getToken } from "next-auth/jwt";
import { getTokenDetails } from "../../../../../utils/authuser";

export async function POST(req, { params }) {
  try {
    await connectMongoDB();

    const token = await getToken({req})
    const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization').split(' ')[1]
    let leaderId = await getTokenDetails(auth);

    const leader = await Users.findById(leaderId);

    if (leader.event2TeamRole !== 0) {
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

    if (userToRemove.event2TeamId == null ||
      userToRemove.event2TeamId.toString() !== leader.event2TeamId.toString()) {
      return NextResponse.json({
        message: "UserId given is not part of the team",
      });
    }

    await Users.findOneAndUpdate(
      { _id: userToRemoveId },
      { event2TeamId: null, event2TeamRole: -1 }
    );

    await Event2.findOneAndUpdate(
      { _id: leader.event2TeamId },
      { $pull: { members: userToRemoveId } }
    );

    return NextResponse.json({
      message: "Team member removed successfully",
      status: 200,
    });

  } catch (error) {
    console.log("An error occurred:", error);
    return NextResponse.json({ message: "Error occurred ",}, {status: 500 });
  }
}
