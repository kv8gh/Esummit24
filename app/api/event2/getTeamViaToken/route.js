import { connectMongoDB } from "@/lib/mongodb";
import { Event2 } from "@/models/event2.model";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    await connectMongoDB();
    const { code } = await req.json();
    console.log(code);
    const team = await Event2.findOne({ teamCode: code });
    if (!team) {
      return NextResponse.json({ error: "Team not found" });
    }

    return NextResponse.json({
      message: "Team Details sent. ",
      status: 200,
      teamDetails: team,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "Error occurred ", status: 500 });
  }
}
