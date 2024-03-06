import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { UsersDetails } from "@/models/Userdetails";
import { TeamModel } from "@/models/TeamDetails";
import { Users } from "@/models/user";
import { middleware } from "../../middleware/route";

export const POST = middleware(async function(req) {
    try{
        await connectMongoDB();
        const user = await Users.findById(req.user._id);
        console.log(user);
        const {teamName}=await req.json();
        console.log(teamName)
    const newTeam = await new TeamModel({
        teamName:teamName
        
    
    }).save();
 
    return NextResponse.json({ message: "Team Details entered ", status: 200 });




}catch(error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "Error occurred ", status: 500 });
}
})