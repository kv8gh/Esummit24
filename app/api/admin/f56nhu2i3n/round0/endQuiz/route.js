import { connectMongoDB } from '@/lib/mongodb';
import { Round0 } from '@/models/round0.model';
import { Event1Test } from '@/models/event1Test.model';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const teams = await Round0.find();
    let team;
    for (team of teams) {
      await Round0.findOneAndUpdate(
        {teamName: team.teamName},
        {questionCategory:'waiting'}
      );
      }
      
      return NextResponse.json({ message:"Quiz ended successfully" },{status:200});
    }
   catch (error) {
    console.error(error);
    return NextResponse.json({message:error}, { status:500 });
  }
}
