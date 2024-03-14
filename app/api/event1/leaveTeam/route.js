import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { UsersDetails } from "@/models/Userdetails";
import { TeamModel } from "@/models/TeamDetails";
import { Users } from "@/models/user";

import {getTokenDetails} from "../../../../utils/authuser"
import { generateTokens } from "../../login/generateTokensTeam/route";
import UserDetails from "@/components/userDetails";
import { getToken } from "next-auth/jwt";


export async function POST(req){
    try{
        await connectMongoDB();

        const token = await getToken({req})
        const auth = token ? token.accessTokenFromBackend : null
        let userId = await getTokenDetails(auth);

        console.log(userId);
        const user = await Users.findById(userId);

        if (user.teamRole != "1") {
            return NextResponse.json({
                message: "Leader cant leave the team",
            });
        }

        if (!user.teamId) {
            return NextResponse.json({
                message: "User is not part of any team",
            });
        }

        const team = await TeamModel.findById(user.teamId);
        if (!team) {
            return NextResponse.json({
                message: "Team not found",
            });
        }

        team.members.pull(userId);
        await team.save();

        await Users.findByIdAndUpdate(userId, { $set: { teamId: null, teamRole:-1 } });

        

        
       return NextResponse.json({ message: "User has left the team successfully ", status: 200, teamDetails: team });




}catch(error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "Error occurred ", status: 500 });
}
}