import { Users } from "@/models/user.model";
import { connectMongoDB } from "@/lib/mongodb";
import { getTokenDetails } from "@/utils/authuser";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await connectMongoDB();
    const headers = req.headers;
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
      if (currentEventsArr.includes(2)) {
        return NextResponse.json(
          { message: "User has already registered for the event2." },
          { status: 200 }
        );
      }
    } 
    const modifiedEventsArr = [...currentEventsArr, 2];
    user.events = modifiedEventsArr;
    await user.save();
    return NextResponse.json(
      { message: "User registered for event2 successfully." },
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