import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { UsersDetails } from "@/models/Userdetails";
import { Event2 } from "@/models/event2.model";
import { Users } from "@/models/user";

import {getTokenDetails} from "../../../../utils/authuser"
import { generateTokens } from "../../login/generateTokensTeam/route";


export async function POST(req){
    try{
        await connectMongoDB();
        const headers = req.headers;
        

      

        const auth = req.headers.get("authorization").split(' ')[1];
 
        let userId = await getTokenDetails(auth);
        console.log(userId)
     
        const user = await UsersDetails.findById({ _id: userId});
        if(!user){
            return NextResponse.json({ message: "User Not found"});
        }
        
        console.log(user);

        const teamId = user.teamId;
        const team = await Event2.findById(teamId);
        if (!team) {
            return NextResponse.json({ message: "Team is not there " });
        }


       return NextResponse.json({ message: "Team Details sent. ", status: 200, teamDetails: team });




}catch(error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "Error occurred ", status: 500 });
}
}