const messageOne = (email, hostName, gameId) => {
  return {
    to: email,
    from: "teamdragon082020@gmail.com",
    subject: `${hostName} has invited you to play Cluewords`,
    text: `Hey there! ${hostName} would like you to play Cluewords with them. Click here to join the game! Testing only, gameId == ${gameId}`,
    html: `<a href="http://localhost:3000/"${gameId}Click here to join the game!</a>`,
  };
};

module.exports = { messageOne };
