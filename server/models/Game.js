const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  gameId: {
    type: String,
    required: true,
  },
  hostId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  players: [
    {
      userId: {
        type: String,
      },
      name: {
        type: String,
      },
      gameId: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Game", gameSchema);
