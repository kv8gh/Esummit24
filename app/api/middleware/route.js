// pages/api/auth.js

import { connectMongoDB } from "@/lib/mongodb";

import { Users } from "@/models/user";
import { generateTokens } from "../login/generateTokens/route";

export const middleware = (handler) => async (req, res) => {
    const headersMap = req.headers(headersList[Symbol.for('headers map')]);

    // Retrieve the value of the 'authorization' header
    const authorizationHeader = headersMap.get('authorization');
    
    // If authorization header is found, log its value
    if (authorizationHeader) {
        console.log(authorizationHeader); // Log the value of the authorization header
    } else {
        console.log('Authorization header not found');
    }


   

    /*
    const authHeader = req.headers["Authorization"];
    console.log(authHeader)
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (!token) {
        res.status(403).json({ message: "Access Denied: No token provided" });
        return;
    }

    try {
        const tokenDetails = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await Users.findById(tokenDetails._id);
        if (!user) {
            res.status(403).json({ message: "Please SignOut and SignIn Again" });
            return;
        }
        console.log("+++", tokenDetails);
        req.user = tokenDetails;
        return handler(req, res);
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Please SignOut and SignIn Again" });
        return;
    }
    */
};