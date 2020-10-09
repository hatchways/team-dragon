class Team {
  constructor(name, players = [], points = 0) {
    this.name = name;
    this.players = players;
    this.points = points;
  }

  addPoint() {
    this.points += 1;
    console.log(`${this.name} team gains a point`);
  }

  addPlayer(player) {
    this.players.push(player);
    console.log(`${player.name} added to team ${this.name}`);
  }

  getName() {
    return this.name;
  }

  resetPoints() {
    this.points = 0;
  }
  resetPlayers() {
    this.players = [];
  }
}

module.exports = Team;
