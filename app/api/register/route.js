import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import {Users} from "@/models/user"


export async function POST(req){
    try{
        await connectMongoDB();
        const {name,email,password}=await req.json();
        const newUser = new Users({ name, email, password });
  
        await newUser.save();
        console.log(name)
        return NextResponse.json({ message: "User registered", status: 200 });

        

    }catch(error) {
        console.error("An error occurred:", error);
        return NextResponse.json({ message: "Error occurred while registering user", status: 500 });
    }
    
}