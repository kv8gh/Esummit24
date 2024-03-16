import { connectMongoDB } from "@/lib/mongodb";
import { Users } from "@/models/user.model";
import { getTokenDetails } from "@/utils/authuser";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req, _) {
  try {
    await connectMongoDB();
    const token = await getToken({req})
    const auth = token ? token.accessTokenFromBackend : null
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
    if (!currentEventsArr.includes(4)) {
      return NextResponse.json(
        { message: "User has not registered for event4 previously." },
        { status: 400 }
      );
    }
    for (let i = 0; i < currentEventsArr.length; i++) {
      if (currentEventsArr[i] === 4) {
        currentEventsArr.splice(i, 1);
      }
    }
    user.events = currentEventsArr;
    await user.save();
    return NextResponse.json(
      { message: "User deregistered for event4 successfully." },
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
