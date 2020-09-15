const Team = require("./team");
const Player = require("./player");
const gameData = require("./gameData");
const getRandomNumber = require("./util");

//Dev dependency
const prompt = require('prompt-sync')();

class Game {
  constructor() {
    this.redTeam = new Team();
    this.blueTeam = new Team();
    this.board = gameData;
    this.turn = this.redTeam;
    this.assasinIndex = 7; // Should be random, Change it later on
    this.redTeam.turn = true;
  }

  // Get Board
  getBoard() {
    return this.board;
  }

  // Team assignment to players (even and odd)
  assignTeams(players) {
    try {
      if (players.length < 4 || players.length > 8) {
        throw new Error("Only 4-8 players are allowed");
      } else {
        for (let i = 0; i < players.length; i++) {
          if (i % 2 === 0) {
            this.redTeam.players.push(new Player(players[i]));
          } else {
            this.blueTeam.players.push(new Player(players[i]));
          }
        }
      }
    } catch (e) {
      console.log(e.name);
      console.log(e.message);
    }
  }

  // Method to assign role to players
  assignRoles(teamPlayers) {
    const randomNumber = getRandomNumber(teamPlayers.length);
    for (let i = 0; i < teamPlayers.length; i++) {
      if (i !== randomNumber) {
        teamPlayers[i].role = "guesser";
      } else {
        teamPlayers[i].role = "spymaster";
      }
    }
  }

  // start(){
  //   let gameRunning = true;
  //   let i = 0;
  //   while(gameRunning){
  //     let input = prompt("Enter a number from 1 to 12");
  //     if(input === "exit"){
  //       break;
  //     }
  //   }
  // }

  // Any Team member picks a card
  pickCard(team, cardIndex) {
    switch (cardIndex) {
      case this.assasinIndex:
        this.matchOver(team);
        break;

      case this.regularCard:
        this.changeTurn();
        break;
      case this.redCard:
        if(team === this.redTeam){
          this.addPoint(this.redTeam);
        }
        else{
          this.changeTurn();
        }
        break;
      case this.blueCard:
        if(team === this.blueTeam){
          this.addPoint(this.blueTeam);
        }
        else{
          this.changeTurn();
        }
        break;
      default:
        return false;
    }
  }

  //change Turn
  changeTurn(){
    if(!this.redTeam.turn){
      this.redTeam.turn = true;
      this.blueTeam.turn =false;
    }
    else{
      this.blueTeam.turn = true;
      this.redTeam.turn = false;
    }
  }

  // Giving point to one of the teams
  addPoint(team) {
    team.points += 1;
  }

  //Reset the game to initial state
  resetGame() {}

  // Any case where match comes to an end
  matchOver(looserTeam) {
    if(looserTeam === this.redTeam){
      return "Congrats! Blue team won the match";
    }
    else{
      return "Congrats! Red team won the match";
    }
  }
}

module.exports = Game;
