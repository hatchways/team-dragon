const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// All Players
const playerSchema = new Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  matchId: {
    type: Number,
  },
});

module.exports = mongoose.model("Player", playerSchema);
