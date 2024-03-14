const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamTokenSchema = new Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teams',
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: 'event1TeamToken' }
);

export const event1TeamToken =
  mongoose.models.event1TeamToken ||
  mongoose.model('event1TeamToken', teamTokenSchema);
