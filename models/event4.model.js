import mongoose, { mongo } from "mongoose";
import UsersDetails from "@/components/userDetails";

const event4Schema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: Users,
        }
    }
)

const Event4 =  mongoose.model("Event4", event4Schema);
export default Event4;