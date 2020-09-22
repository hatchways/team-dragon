const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Match skeleton
const matchSchema = new Schema({
  redTeam: {
    type: teamSchema,
    required: true,
  },
  blueTeam: {
    type: teamSchema,
    required: true,
  },
  board: {
    type: [
      {
        word: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
  },
});

module.exports = matchSchema;
