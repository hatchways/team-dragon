const mongoose = require("mongoose");
const playerSchema = require("./player");
const Schema = mongoose.Schema;


// Team skeleton
const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  players: {
    type: playerSchema,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  turn: {
    type: Boolean,
    required: true,
  },
});

module.exports = teamSchema;