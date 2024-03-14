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
    regNo: {
      type: String,
    },
    mobNo: {
      type: Number,
    },
    event1TeamRole: {
      type: Number, // 0 for leader, 1 for member
    },
    event1TeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event1',
    },
    event2TeamRole: {
      type: Number, // 0 for leader, 1 for member
    },
    event2TeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event2',
    },
    // event3TeamRole: {
    //   type: Number, // 0 for leader, 1 for member
    // },
    // event3TeamId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Event3',
    // },
    // event4TeamRole: {
    //   type: Number, // 0 for leader, 1 for member
    // },
    // event4TeamId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Event4',
    // },

    hasFilledDetails: {
      type: Boolean,
      default: false,
    },
  },
  { collection: 'Users' }
);

export const Users =
  mongoose.models.Users || mongoose.model('Users', userSchema);
