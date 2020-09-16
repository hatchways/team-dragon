const mongoose = require("mongoose");
const matchSchema = require('./match');

const Schema = mongoose.Schema;

// Game Skeleton
const gameStateSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  match: {
    type: matchSchema,
    required: true,
  },
});

// Team assignment to players
gameStateSchema.methods.assignTeam = ({ id, name }, team) => {
  switch (team) {
    case "red":
      this.redTeam.addPlayer(new Player(id, name));

    case this.blueTeam.name:
      return this.blueTeam.addPlayer(new Player(id, name));
    default:
      return null;
  }
};

module.exports = mongoose.model("GameState", gameStateSchema);
