import { Users } from "@/models/user.model";
import { connectMongoDB } from "@/lib/mongodb";
import { getTokenDetails } from "@/utils/authuser";
import { NextResponse } from "next/server";

export async function GET(req, _) {
  try {
    await connectMongoDB();
    const auth = req.headers.get("authorization").split(" ")[1];
    const userId = await getTokenDetails(auth);
    if (!userId) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const user = await Users.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
    let currentEventsArr = new Array();
    if (user.events) {
      currentEventsArr = user.events;
    }
    if (!currentEventsArr.includes(2)) {
      return NextResponse.json(
        { message: "User has not registered for event2 previously." },
        { status: 400 }
      );
    }
    if (user.event1TeamId)
      return NextResponse.json(
        { message: "Delete existing team first." },
        { status: 400 }
      );
    for (let i = 0; i < currentEventsArr.length; i++) {
      if (currentEventsArr[i] === 1) {
        currentEventsArr.splice(i, 1);
      }
    }
    user.events = currentEventsArr;
    await user.save();
    return NextResponse.json(
      { message: "User deregistered for event2 successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: `Internal Server Error. ${err.message}` },
      { status: 500 }
    );
  }
}
