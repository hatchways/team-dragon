class Team {
  constructor(name) {
    this.name = name;
    this.players = [];
    this.points = 0;
  }

  addPoint(){
    this.points += 1;
    console.log(`${this.name} team gains a point`);
  }

  addPlayer(player){
    this.players.push(player);
    console.log(`${player.name} added to team ${this.name}`);
  }

  getName(){
    return this.name;
  }
}

module.exports = Team;
