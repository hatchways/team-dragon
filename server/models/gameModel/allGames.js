var allGames = new Map();

module.exports = {
  addGame: (gameId, gameState) => {
    allGames.set(gameId, gameState);
  },

  getGame: (gameId) => {
    return allGames.get(gameId);
  },
  getAllGames: () => {
    return allGames;
  },
};
