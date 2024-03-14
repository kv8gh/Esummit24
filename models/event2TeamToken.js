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
  { collection: 'event2TeamToken' }
);

export const event2TeamToken =
  mongoose.models.event2TeamToken ||
  mongoose.model('event2TeamToken', teamTokenSchema);
