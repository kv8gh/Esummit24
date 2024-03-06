import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import {Users} from "@/models/user";
import {generateTokens} from "../login/generateTokens/route"


export async function POST(req){
    try{
        await connectMongoDB();
        const {name,email,password}=await req.json();
        const userExists=await Users.findOne({email:email})
        if(!userExists){
        const newUser = new Users({ name, email, password });
        
        await newUser.save();
        const { accessToken, refreshToken } = await generateTokens(newUser);
        console.log(accessToken);
        console.log(refreshToken);
        console.log(name)
        return NextResponse.json({ message: "User registered", status: 200 });
        }else{
            return NextResponse.json({ message: "User has already registered", status: 200 });
        }
        

    }catch(error) {
        console.error("An error occurred:", error);
        return NextResponse.json({ message: "Error occurred while registering user", status: 500 });
    }
    
}