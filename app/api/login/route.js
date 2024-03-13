import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { UsersDetails } from "@/models/Userdetails";
import {generateTokens} from "./generateTokensUser/route.js"
import { Users } from "@/models/user.js";
import { getTokenDetails } from "@/utils/authuser.js";


export async function POST(req){
    try{
        await connectMongoDB();
        const auth = req.headers.get("authorization").split(' ')[1];
 
        let userId = await getTokenDetails(auth);
        console.log(userId);
        const user=await Users.findById(userId);
        console.log(user);
        const {regNo,mobno}=await req.json();
        
        await Users.findByIdAndUpdate(userId,{$set:{regNo:regNo,mobno:mobno}})
       // console.log(newUserDetail);
       // const { accessToken, refreshToken } = await generateTokens(newUserDetail);
       // console.log(accessToken);
       // console.log(refreshToken);

        //console.log(accessToken);
     
        return NextResponse.json({ message: "User Details entered ", status: 200 });

        

    }catch(error) {
        console.error("An error occurred:", error);
        return NextResponse.json({ message: "Error occurred ", status: 500 });
    }
    
}