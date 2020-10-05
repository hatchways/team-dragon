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
        this.io.to(this.gameId).emit("time-out");
        this.stop();

        let currentGame = await GameEngine.getGame(this.gameId);
        currentGame.changeTurn();
        await currentGame.save();

        this.io.to(this.gameId).emit("update-game", currentGame);
        this.start();
      } else {
        this.io.to(this.gameId).emit("tick", this.timeRemaining);
        this.timeRemaining--;
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
    this.timeRemaining = TURN_TIME;
  }
}

module.exports = Timer;
