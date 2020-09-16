const mongoose = require("mongoose");
const teamSchema = require('./team');

const Schema = mongoose.Schema;

// Player skeleton
const playerSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  team: {
    type: teamSchema,
    required: true,
  },
});

module.exports = playerSchema;