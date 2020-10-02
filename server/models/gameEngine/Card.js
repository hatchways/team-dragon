class Card {
  constructor(word, type) {
    this.word = word;
    this.type = type;
    this.clicked = false;
  }

  getType() {
    return this.type;
  }

  getWord() {
    return this.word;
  }
}

module.exports = Card;
