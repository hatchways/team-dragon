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
      this.teamList = {};
      this.board = this.createBoard();
      this.startingTeam = getRandomNumber(2) === 0 ? "blue" : "red";
      this.turn = this.startingTeam;
      this.players = [];
      this.host = null;
      this.gameStatus = "setup";
      this.endGame = {};
    } else {
      this.id = data.id;
      this.redTeam = new Team(
        data.redTeam.name,
        data.redTeam.players,
        data.redTeam.points,
      );
      this.blueTeam = new Team(
        data.blueTeam.name,
        data.blueTeam.players,
        data.blueTeam.points,
      );
      this.board = data.board;
      this.turn = data.turn;
      this.startingTeam = data.startingTeam;
      this.teamList = data.teamList;
      this.players = data.players;
      this.host = data.host;
      this.gameStatus = data.gameStatus;
      this.endGame = {};
    }
  }

  static async getGame(id) {
    try {
      const response = await redis.get(id);
      if (!response) {
        return null;
      }

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
        cardType = this.startingTeam === "blue" ? "blue" : "red";
        board.push(new Card(randWords[i - 1], cardType));
      } else if (i <= 17) {
        cardType = this.startingTeam === "blue" ? "red" : "blue";
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

  createTeamList(redTeam, blueTeam) {
    let blueList = blueTeam.reduce(
      (obj, player) => {
        if (player.role === "guesser") {
          obj["guesser"].push(player.name);
          return obj;
        } else {
          obj["spyMaster"] = player.name;
          return obj;
        }
      },
      { guesser: [] },
    );

    let redList = redTeam.reduce(
      (obj, player) => {
        if (player.role === "guesser") {
          obj["guesser"].push(player.name);
          return obj;
        } else {
          obj["spyMaster"] = player.name;
          return obj;
        }
      },
      { guesser: [] },
    );

    this.teamList = {
      blue: blueList,
      red: redList,
    };
  }
  // Sets the current user
  setHost(user) {
    this.host = user;
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
  pickCard(team, cardIndex) {
    let cardType = this.board[cardIndex].type;
    console.log(`${team} team picks a: ${cardType} card`);

    this.board[cardIndex].clicked = true;

    switch (cardType) {
      case "assassin":
        this.gameOver(
          team === this.redTeam.name ? this.blueTeam.name : this.redTeam.name,
          "assassin",
        );
        break;
      case "innocent":
        this.changeTurn();
        break;
      case "red":
        this.redTeam.addPoint();
        if (team === this.redTeam.name) {
          console.log(`${team} gets 1 point`);
        } else {
          this.changeTurn();
          console.log(`${team} turn over`);
        }
        break;
      case "blue":
        this.blueTeam.addPoint();
        if (team === this.blueTeam.name) {
          console.log(`${team} gets 1 point`);
        } else {
          this.changeTurn();
          console.log(`${team} turn over`);
        }
        break;
      default:
        return false;
    }

    this.gameDecision();
  }

  // Any case where game comes to an end
  gameOver(winner, method) {
    const capitalizeWinner = (name) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    };
    switch (method) {
      case "assassin":
        if (winner === "red") {
          this.endGame.winner = capitalizeWinner(this.redTeam.name);
          this.endGame.gameOverText = `${capitalizeWinner(
            this.blueTeam.name,
          )} team picked the asssassin`;
          console.log(
            `${this.blueTeam.name} team picked assassin. ${this.redTeam.name} team wins`,
          );
        } else {
          this.endGame.winner = capitalizeWinner(this.blueTeam.name);
          this.endGame.gameOverText = `${capitalizeWinner(
            this.redTeam.name,
          )} team picked the asssassin`;
          console.log(
            `${this.redTeam.name} team picked assassin. ${this.blueTeam.name} team wins`,
          );
        }
        break;
      case "lastCard":
        if (winner === "red") {
          this.endGame.winner = capitalizeWinner(this.redTeam.name);
          this.endGame.gameOverText = `${capitalizeWinner(
            this.redTeam.name,
          )} found all of their cards`;
          console.log(`${this.redTeam.name} team wins - all cards found`);
        } else {
          this.endGame.winner = capitalizeWinner(this.blueTeam.name);
          this.endGame.gameOverText = `${capitalizeWinner(
            this.blueTeam.name,
          )} found all of their cards`;
          console.log(`${this.blueTeam.name}team wins - all cards found`);
        }
        break;
      case "manual":
        this.endGame.winner = "No";
        this.endGame.gameOverText = "Host has ended game early";
        break;
      default:
        return null;
    }

    this.gameStatus = "over";
  }

  // Decision whether blue or red wins
  gameDecision() {
    const winningScoreRed = this.startingTeam === "red" ? 9 : 8;
    const winningScoreBlue = this.startingTeam === "red" ? 9 : 8;

    if (this.redTeam.points === winningScoreRed) {
      this.gameOver(this.redTeam.name, "lastCard");
      console.log(`${this.redTeam.name} wins the game`);
    } else if (this.blueTeam.points === winningScoreBlue) {
      this.gameOver(this.blueTeam.name, "lastCard");
      console.log(`${this.blueTeam.name} wins the game`);
    } else {
      console.log("Next Move Please!");
    }
  }
}

module.exports = GameEngine;
