var allMatches = new Map();

module.exports = {
  addMatch: (matchId, matchState) => {
    allMatches.set(matchId, matchState);
  },

  getMatch: (matchId) => {
    return allMatches.get(matchId);
  },
  getMatches: () => {
    return allMatches.keys();
  }
};
