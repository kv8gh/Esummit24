import mongoose from 'mongoose';
import { Schema } from 'mongoose';



const teamTokenSchema = new Schema(
  {
    teamId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 30 * 86400, // 30 days
    },
  },
  { collection: "TeamToken" }
);

export const TeamToken =
  mongoose.models.TeamToken || mongoose.model('TeamToken', teamTokenSchema);