const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Game Skeleton
const matchSchema = new Schema({
  matchId: {
    type: String,
    required: true,
  },
  hostId: { type: Schema.Types.ObjectId, required: true },
  players: [
    {
      userId: {
        type: String,
      },
      name: {
        type: String,
      },
      matchId: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("Match", matchSchema);
