import { Users } from "@/models/user";
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
    const currentEventsArr = user.events;
    if (currentEventsArr.includes(5)) {
      return NextResponse.json(
        { message: "User has already registered for the event5." },
        { status: 200 }
      );
    }
    const modifiedEventsArr = [...currentEventsArr, 5];
    user.events = modifiedEventsArr;
    await user.save();
    return NextResponse.json(
      { message: "User registered for event5 successfully." },
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
