import mongoose, { mongo } from "mongoose";
import UsersDetails from "@/components/userDetails";

const event5Schema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: Users,
        }
    }
)

const Event5 =  mongoose.model("Event5", event5Schema);
export default Event5;