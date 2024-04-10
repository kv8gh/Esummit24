import { connectMongoDB } from '@/lib/mongodb';
import { Round0 } from '@/models/round0.model';
import { Event1Test } from '@/models/event1Test.model';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const teams = await Event1Test.find();
    let team;
    for (team of teams) {
      const teamId = team._id;
      const teamName = team.teamName;
      const teamLeaderId = team.teamLeaderId;
      const newLevel1 = await new Round0({
        teamId:teamId,
        teamName: teamName,
        teamLeaderId:teamLeaderId,
        questionCategory: 'instruction'
      })
      await newLevel1.save();
      
    }
    return NextResponse.json({ message:"Data transferred successfully" },{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({message:error}, { status:500 });
  }
}
