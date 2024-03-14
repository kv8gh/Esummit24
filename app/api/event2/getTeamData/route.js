import { connectMongoDB } from "@/lib/mongodb";
import { Event2 } from "@/models/event2.model";
import { Users } from "@/models/user.model";
import { NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";
import { getTokenDetails } from "../../../../utils/authuser";


export async function POST(req){
    try{
        await connectMongoDB();
        const headers = req.headers;
        

      

        const token = await getToken({req})
        const auth = token ? token.accessTokenFromBackend : null
        let userId = await getTokenDetails(auth);
        console.log(userId)
     
        const user = await Users.findById({ _id: userId});
        if(!user){
            return NextResponse.json({ message: "User Not found"});
        }
        
        console.log(user);

        const teamId = user.event1TeamId;
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