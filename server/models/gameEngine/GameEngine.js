const Team = require("./Team");
const Player = require("./Player");
const Card = require("./Card");
const getRandomNumber = require("./utils/randomNumber");
const shuffle = require("./utils/shuffle");
const { words } = require("./utils/words");
const Redis = require("ioredis");
const config = require("../../config");

const redis = new Redis(config.redis);

class GameEngine {
  constructor(data = null) {
    if (!data) {
      this.id = getRandomNumber(1000);
      this.redTeam = new Team("red");
      this.blueTeam = new Team("blue");
      this.board = this.createBoard();
      this.turn = getRandomNumber(2) === 0 ? "blue" : "red";
      this.cardsFlipped = 0;
      this.players = [];
      this.currentUser = null;
      this.gameStatus = "setup";
      this.winner = "";
    } else {
      this.id = data.id;
      this.redTeam = new Team(
        data.redTeam.name,
        data.redTeam.players,
        data.redTeam.points,
      );
      this.blueTeam = new Team(
        data.redTeam.name,
        data.redTeam.players,
        data.redTeam.points,
      );
      this.board = data.board;
      this.turn = data.turn;
      this.cardsFlipped = data.cardsFlipped;
      this.players = data.players;
      this.currentUser = data.currentUser;
      this.gameStatus = data.gameStatus;
      this.winner = data.winner;
    }
  }

  static async getGame(id) {
    try {
      const response = await redis.get(id);
      return new this(JSON.parse(response));
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async save() {
    try {
      await redis.set(this.id, JSON.stringify(this));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  // Get Board with all cards in an array
  getBoard() {
    return this.board;
  }

  createBoard() {
    const randWords = shuffle(words).slice(0, 25);
    const board = [];
    let cardType;

    for (let i = 1; i <= 25; i++) {
      if (i <= 9) {
        cardType = this.turn === "blue" ? "blue" : "red";
        board.push(new Card(randWords[i - 1], cardType));
      } else if (i <= 17) {
        cardType = this.turn === "blue" ? "red" : "blue";
        board.push(new Card(randWords[i - 1], cardType));
      } else if (i <= 24) {
        cardType = "innocent";
        board.push(new Card(randWords[i - 1], cardType));
      } else {
        cardType = "assassin";
        board.push(new Card(randWords[i - 1], cardType));
      }
    }

    return shuffle(board);
  }

  // Team assignment to players
  assignTeam({ id, name }, team) {
    switch (team) {
      case this.redTeam.name:
        this.redTeam.addPlayer(new Player(id, name, team));
        break;
      case this.blueTeam.name:
        this.blueTeam.addPlayer(new Player(id, name, team));
        break;
      default:
        return null;
    }
  }

  // Assign role to a player using player Id
  assignRole(playerId, role) {
    this.redTeam.players.forEach((item) => {
      if (item.id === playerId) {
        item.setRole(role);
      }
    });

    this.blueTeam.players.forEach((item) => {
      if (item.id === playerId) {
        item.setRole(role);
      }
    });
  }

  // Sets the current user
  setCurrentUser(user) {
    this.currentUser = user;
  }

  // Updated players in the array for this game
  getCurrentPlayers() {
    return this.players;
  }

  // New user joins the game and gets added to players array of the game
  joinGame(user) {
    if (this.players.length === 0) {
      this.players.push(user);
      return this.players;
    }

    // To avoid duplication
    const result = this.players.find(
      (player) => player.id.toString() === user.id.toString(),
    );
    if (!result) {
      this.players.push(user);
    }

    return this.players;
  }

  startGame() {
    this.gameStatus = "running";
  }

  //Reset the game to initial state
  resetGame() {
    this.redTeam = new Team("red");
    this.blueTeam = new Team("blue");
    this.board = this.createBoard();
    this.turn = "blue";

    console.log("Game was reset!!!");
  }

  //change Turn
  changeTurn() {
    if (this.turn == "blue") {
      this.turn = "red";
      console.log(`${this.turn} team's turn!`);
    } else {
      this.turn = "blue";
      console.log(`${this.turn} team's turn!`);
    }
  }

  // Any Team member picks a card
  pickCard(playerId, cardIndex) {
    let team;
    this.redTeam.players.forEach((item) => {
      if (item.id === playerId) {
        team = item.getTeam();
      }
    });

    this.blueTeam.players.forEach((item) => {
      if (item.id === playerId) {
        team = item.getTeam();
      }
    });

    let cardType = this.board[cardIndex].type;
    console.log(`${team} team picks a card and gets : ${cardType} card`);
    switch (cardType) {
      case "assasin":
        this.gameOver(team);
        break;

      case "innocent":
        this.changeTurn();
        break;
      case "red":
        if (team === this.redTeam.name) {
          this.redTeam.addPoint();
        } else {
          this.changeTurn();
        }
        break;
      case "blue":
        if (team === this.blueTeam.name) {
          this.blueTeam.addPoint();
        } else {
          this.changeTurn();
        }
        break;
      default:
        return false;
    }

    this.cardsFlipped += 1;
    this.gameDecision();
  }

  // Any case where game comes to an end
  gameOver(winner) {
    if (winner === this.redTeam.name) {
      this.winner = this.redTeam.name;
      console.log("Congrats! Red team won the game");
    } else {
      this.winner = this.blueTeam.name;
      console.log("Congrats! Blue team won the game");
    }
    this.gameStatus = "over";
  }

  // Decision whether blue or red wins
  gameDecision() {
    if (this.redTeam.points + this.blueTeam.points === 16) {
      if (this.redTeam.points > this.blueTeam.points) {
        console.log(`${this.redTeam.name} wins the game`);
      } else if (this.redTeam.points === this.blueTeam.points) {
        console.log("Game was a DRAW");
      } else {
        console.log(`${this.blueTeam.name} wins the game`);
      }
    } else {
      console.log("Next Move Please!");
    }
  }
}

module.exports = GameEngine;
