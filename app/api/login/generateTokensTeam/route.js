import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { UsersDetails } from "@/models/Userdetails";
import { TeamToken } from "@/models/teamToken";


import jwt from "jsonwebtoken";



export async function generateTokens(team){
    console.log(team);
    try {
        const payload = {
            _id: team._id,
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "5d",
        });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "30d",
        });

        const teamToken = await TeamToken.findOne({ teamId: team._id });
        console.log("!!!!!!",teamToken)
        if (teamToken) await teamToken.deleteOne();

        await new TeamToken({ teamId: team._id, token: refreshToken }).save();
        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        return Promise.reject(err);
    }
};

