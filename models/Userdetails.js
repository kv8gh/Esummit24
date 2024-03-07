

import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userDetailSchema = new Schema(
    {
   
        hasFilledDetails: {
            type: Boolean,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        regNo: {
            type: String,
        },
        mobno: {
            type: Number,
        },
        teamRole:{
            type:Number,
        },
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TeamModel",
        },
      
        
    
        date: {
            type: Date,
            default: Date.now(),
        },
      
        
    },
    {timestamps:true},
    { collection: "UsersDetails" }
);


export const UsersDetails =
  mongoose.models.UsersDetails || mongoose.model('UsersDetails', userDetailSchema);

