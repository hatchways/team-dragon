const getRandomWords = require("../gameEngine/util/randomWords");
const Card = require("./Card");
const getRandomNumber = require("./util/randomNumber");

exports.getData = () => {
  // Data to be used for the cards
  let words = getRandomWords(25);

  // Card Types
  let cardType = ["red", "blue", "innocent"];

  let board = words.map((word, index) => {
    if (index === getRandomNumber(25)) {
      return new Card(word, "assasin"); //Assasin card is assigned here
    }
    return new Card(word, cardType[getRandomNumber(3)]);
  });
  return board;
};
