import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { TeamModel } from "@/models/TeamDetails";
import { getTokenDetails } from "@/utils/authuser";
import { TeamToken } from "@/models/teamToken";
import { customAlphabet } from 'nanoid';
import { Users } from "@/models/user";
import { UsersDetails } from "@/models/Userdetails";



export async function POST(req,{params}){

    try{
        
        await connectMongoDB();
        const headers = req.headers;
        const auth = req.headers.get("authorization").split(' ')[1];
        //console.log(auth)
        let userId = await getTokenDetails(auth);
        console.log(userId);
        const user = await Users.findById({ _id: userId});
        console.log(user)


        if (user.teamId) {
            return NextResponse.json({ message: "User is already a part of team" });
        }
       
        const {code} = await req.json();
        console.log(code);
        const team = await TeamModel.findOne({ teamCode: code });
        //check if user is not a part of any team
        if (!team) {
            return NextResponse.json({ error: 'Team not found' });
        }
        if (team.members.length === 4) {
            return NextResponse.json({ error: 'Team is Full' });
          }
        // console.log(team)
        const token = await TeamToken.findOne({ teamId: team._id });

        if (!token) {
            return res.status(404).json({ error: 'Token not found' });
        }



        const currentTime = new Date();
        const tokenCreationTime = token.createdAt;

        const timeDifference = (currentTime - tokenCreationTime) / (1000 * 60); // Difference in minutes
        //have to change this
        if (timeDifference > 1000000000) {
            // Token expired, prompt for a new token
            return NextResponse.json({ error: 'Token expired. Ask leader to generate a new token.' });
        }
        if (code !== token.token) {
            return NextResponse.json({ error: 'Incorrect token' });
        }

        await Users.findOneAndUpdate({ _id: userId }, { $set: { teamId: team.id, teamRole: 1 } });

        await TeamModel.findOneAndUpdate(
            {
              _id: team._id,
            },
            {
              $push: { members: userId },
            }
          );
          return NextResponse.json({ message: 'You have joined the team!' });
}catch(error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "Error occurred ", status: 500 });
}
}