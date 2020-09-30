const Team = require("./Team");
const Player = require("./Player");
const Card = require("./Card");
const getRandomNumber = require("./utils/randomNumber");
const shuffle = require("./utils/shuffle");
const { words } = require("./utils/words");

class GameEngine {
  constructor() {
    this.id = getRandomNumber(1000);
    this.redTeam = new Team("red");
    this.blueTeam = new Team("blue");
    this.board = this.createBoard();
    this.turn = getRandomNumber(2) === 0 ? "blue" : "red";
    this.cardsFlipped = 0;
    this.players = [];
    this.currentUser = null;
    this.gameStatus = "setup";
    console.log("Game ID:", this.id);
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

  //Reset the game to initial state
  resetGame() {
    this.redTeam = new Team("red");
    this.blueTeam = new Team("blue");
    this.board = this.createBoard();
    this.turn = "blue";
    console.log("Game was reset!!!");
  }

  // Any case where game comes to an end
  gameOver(looserTeam) {
    if (looserTeam === this.redTeam.name) {
      console.log("Congrats! Blue team won the game");
    } else {
      console.log("Congrats! Red team won the game");
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

  // Sets the current user
  setCurrentUser(user) {
    this.currentUser = user;
  }

  // Updated players in the array for this game
  getCurrentPlayers() {
    return this.players;
  }

  toJson() {
    return JSON.stringify(this);
  }

  startGame() {
    this.gameStatus = "running";
  }
}

module.exports = GameEngine;
