export const asyncForEach = async (enumObject, callback) => {
  const promises = [];

  enumObject.forEach((obj) => promises.push(callback(obj)));

  return await Promise.all(promises);
};

export const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export const getRandomQuestions = (numberOfQuestions) => {
  const orderedArray = Array.from(Array(numberOfQuestions + 1).keys()).slice(1, numberOfQuestions + 1);
  return utils.shuffle(orderedArray);
}

export const getCurrentBaseURL = () => {
  return window.location.origin;
}

export const focus = (element) => {
  element.focus();
};

const utils = {
  asyncForEach,
  shuffle,
  getRandomQuestions,
  focus,
}

export default utils;
