import mongoose, { mongo } from "mongoose";
import { Schema } from 'mongoose';
import UsersDetails from "@/components/userDetails";

const event3Schema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        }
    }
)

const Event3 =  mongoose.model("Event3", event3Schema);
export default Event3;