const getRandomNumber = require("./randomNumber");

const data = [
  "cabbage",
  "scissors",
  "store",
  "prose",
  "books",
  "hammer",
  "cause",
  "machine",
  "language",
  "ducks",
  "development",
  "collar",
  "ear",
  "psychology",
  "decision",
  "girl",
  "competition",
  "concept",
  "art",
  "family",
  "menu",
  "oven",
  "advertising",
  "excitement",
  "weakness",
  "society",
  "singer",
  "contract",
  "thanks",
  "entry",
  "week",
  "literature",
  "comparison",
  "department",
  "queen",
  "historian",
  "dealer",
  "patience",
  "length",
  "fortune",
  "reading",
  "funeral",
  "country",
  "drama",
  "addition",
  "death",
  "photo",
  "nation",
  "signature",
  "writing",
  "analyst",
  "science",
  "football",
  "improvement",
  "university",
  "database",
  "poem",
  "enthusiasm",
  "disk",
  "reputation",
  "quality",
  "area",
  "Cut",
  "Soulmate",
  "Trapezium",
];

// Method returns random words in an array
const getRandomWords = (size) => {
  let wordArr = [];
  while (wordArr.length !== size) {
    let randomIndex = getRandomNumber(data.length);
    let word = data[randomIndex];
    if (wordArr.includes(word)) {
      continue;
    }
    wordArr.push(word);
  }
  return wordArr;
};

module.exports = getRandomWords;
