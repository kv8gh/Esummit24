import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { UsersDetails } from "@/models/Userdetails";
import {generateTokens} from "./generateTokens/route.js"


export async function POST(req){
    try{
        await connectMongoDB();
        const {firstName,lastName,regNo,mobno}=await req.json();
        const newUserDetail = new UsersDetails({ firstName,lastName,regNo,mobno});
  
        await newUserDetail.save();


        //console.log(accessToken);
     
        return NextResponse.json({ message: "User Details entered ", status: 200 });

        

    }catch(error) {
        console.error("An error occurred:", error);
        return NextResponse.json({ message: "Error occurred ", status: 500 });
    }
    
}