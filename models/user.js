import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
    },

    name: {
      type: String,
    },
    regNo: {
      type: String,
    },
    mobno: {
      type: Number,
    },
    teamRole: {
      type: Number, // 0 for leader, 1 for member
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeamModel",
    },
    events: {
      type: Array,
      default: [],
    },
  },
  { collection: "Users" }
);

export const Users =
  mongoose.models.Users || mongoose.model("Users", userSchema);
