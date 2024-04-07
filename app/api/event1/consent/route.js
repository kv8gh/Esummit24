import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Event1 } from "@/models/event1.model";
import { event1TeamToken } from "@/models/event1TeamToken";
import { Users } from "@/models/user.model";
import { getToken } from "next-auth/jwt";
import { getTokenDetails } from "@/utils/authuser";

export async function POST(req) {
  try {
    await connectMongoDB();

    const token = await getToken({ req });
    const auth = token
      ? token.accessTokenFromBackend
      : req.headers.get("Authorization").split(" ")[1];
    let userId = await getTokenDetails(auth);
    const consent = req.body.consent;
    await Users.findByIdAndUpdate(
      { _id: userId },
      { event1Consent: consent }
  );
  return NextResponse.json(
    { message: "User has event1 consent" },
    { status: 200 }
  );

  } catch (error) {
    console.log("An error occurred:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
