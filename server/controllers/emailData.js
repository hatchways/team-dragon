const messageOne = (email, hostName, gameId, domain) => {
  return {
    to: email,
    from: "teamdragon082020@gmail.com",
    subject: `${hostName} has invited you to play Cluewords`,
    html: `Hey there! ${hostName} would like you to play Cluewords with them. <br> 
    <a href="${domain}/${gameId}">Click here to join the game!</a>`,
  };
};

module.exports = { messageOne };
