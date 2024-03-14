import { connectMongoDB } from "@/lib/mongodb";
import { TeamModel } from "@/models/TeamDetails";
import { Users } from "@/models/user";
import { NextResponse } from "next/server";

import { getTokenDetails } from "../../../../utils/authuser";
import { getToken } from "next-auth/jwt";



export async function POST(req){
    try{
        await connectMongoDB();
        const headers = req.headers;
        

      

        const token = await getToken({req})
        const auth = token ? token.accessTokenFromBackend : null
        let userId = await getTokenDetails(auth);
        console.log(userId)
     
        const user = await Users.findById({ _id: userId});
        
        console.log(user);

        const {teamName}=await req.json();
        const team=await TeamModel.findOne({teamName:teamName})
        if(team){
            return NextResponse.json({ message: "Team Already registered ", status: 200 });
        }
       // console.log(teamName)
        const newTeam = await new TeamModel({
        teamName:teamName,
        teamLeaderId: userId,
        members: [userId],
        
    
    }).save();

    

    await Users.findByIdAndUpdate(
        { _id: userId },
        { $set: { teamId: newTeam._id } }
    );

    //const { accessToken, refreshToken } = await generateTokens(newTeam);
    //console.log(accessToken);
    //console.log(refreshToken);
 
    return NextResponse.json({ message: "Team Details entered ", status: 200 });




}catch(error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "Error occurred ", status: 500 });
}
}