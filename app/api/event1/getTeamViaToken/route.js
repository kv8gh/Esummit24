import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { UsersDetails } from "@/models/Userdetails";
import { TeamModel } from "@/models/TeamDetails";
import { Users } from "@/models/user";

import { getTokenDetails } from "../../../../utils/authuser";
import { generateTokens } from "../../login/generateTokensTeam/route";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { code } = await req.json();
    console.log(code);
    const team = await TeamModel.findOne({ teamCode: code });
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
