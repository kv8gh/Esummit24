
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const teamSchema = new Schema(
    {
        teamName: {
            type: String,
            unique: true
        },
        teamLeaderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        teamNumber: {
            type: Number
        },
        leaderName: {
            type: String
        },
        leaderEmail: {
            type: String
        },
        isQualified: {
            type: Boolean
        },
        currentRound: {
            type: String
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users",
            },
        ],
        teamCode: {
            type: String
        },
        waiting:{
            type:Boolean
        },
        totalPoints:{
            type:Number
        },
        QualifierPoints:{
            type:Number
        },
        currentLevel:{
            type:Number
        },
        isQualify:{
            type:Boolean
        },
       
    },
    { collection: "TeamModel" }
);
export const TeamModel =
  mongoose.models.TeamModel || mongoose.model('TeamModel', teamSchema);

