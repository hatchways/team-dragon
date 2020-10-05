const GameEngine = require("./GameEngine");

const TURN_TIME = 60;

class Timer {
  constructor(io, gameId) {
    this.timerId;
    this.timeRemaining = TURN_TIME;
    this.io = io;
    this.gameId = gameId;
  }

  start() {
    clearInterval(this.timerId);
    this.timeRemaining = TURN_TIME;
    this.timerId = setInterval(async () => {
      if (this.timeRemaining < 0) {
        let currentGame = await GameEngine.getGame(this.gameId);
        currentGame.changeTurn();
        await currentGame.save();

        this.io.to(this.gameId).emit("time-out", currentGame);
        this.timeRemaining = TURN_TIME;
      } else {
        this.io.to(this.gameId).emit("tick", this.timeRemaining);
        this.timeRemaining--;
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
  }
}

module.exports = Timer;
