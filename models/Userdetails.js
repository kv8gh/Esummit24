

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
        
    
        date: {
            type: Date,
            default: Date.now(),
        },
      
        
    },
    { collection: "UsersDetails" }
);


export const UsersDetails =
  mongoose.models.UsersDetails || mongoose.model('UsersDetails', userDetailSchema);

