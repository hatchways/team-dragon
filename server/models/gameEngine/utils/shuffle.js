const shuffle = (array) => {
  // Fisher-Yates shuffle algorithm
  let curr = array.length;
  let rand;

  while (curr !== 0) {
    rand = Math.floor(Math.random() * curr);
    curr -= 1;

    // swap the values
    [array[curr], array[rand]] = [array[rand], array[curr]];
  }

  return array;
};

module.exports = shuffle;
