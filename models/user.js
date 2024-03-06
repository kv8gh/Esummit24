import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
    },
   
    name: {
      type: String,
    },
    password:{
        type:String
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeamDetails",
  },

   
   
  
  },
  { collection: 'Users' }
);

export const Users =
  mongoose.models.Users || mongoose.model('Users', userSchema);
