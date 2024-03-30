import { connectMongoDB } from "@/lib/mongodb";
import { Event2 } from "@/models/event2.model";
import { event2TeamToken } from "@/models/event2TeamToken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { teamCode } = await req.json();
    const team = await event2TeamToken.findOne({ token: teamCode });

    if (!team) {
      return NextResponse.json({ error: "Token not found" });
    }
    const teamDetails = await Event2.findById(team.teamId);

    return NextResponse.json({
      message: "Team Details sent. ",
      status: 200,
      teamDetails: teamDetails,
    });
  } catch (error) {
    console.log("An error occurred:", error);
    return NextResponse.json({ message: "Error occurred ",}, {status: 500 });
  }
}
