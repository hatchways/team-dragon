class Player {
  constructor(id, name, team) {
    this.id = id;
    this.name = name;
    this.role = "";
    this.team = team;
  }

  getTeam() {
    return this.team;
  }

  getId() {
    return this.id;
  }

  setRole(role) {
    this.role = role;
    console.log(`${this.name} is ${this.role}`);
  }
  getRole() {
    return this.role;
  }
}

module.exports = Player;
