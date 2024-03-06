import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { UsersDetails } from "@/models/Userdetails";
import { TeamModel } from "@/models/TeamDetails";

export async function POST(req){

    try{
        await connectMongoDB();
        const {teamName}=await req.json();
        
        const deletedTeam = await TeamModel.deleteOne({teamName:teamName});
        console.log(deletedTeam)
 
    return NextResponse.json({ message: "Team deleted", status: 200 });




}catch(error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "Error occurred ", status: 500 });
}
}