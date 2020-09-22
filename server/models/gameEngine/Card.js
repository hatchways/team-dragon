class Card {
  constructor(word, type) {
    this.word = word;
    this.type = type;
  }

  getType() {
    return this.type;
  }

  getWord() {
    return this.word;
  }
}

module.exports = Card;
