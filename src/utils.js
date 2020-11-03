const NUMBER_OF_AVAILABLE_QUESTIONS = 3;

export const asyncForEach = async (enumObject, callback) => {
  const promises = [];

  enumObject.forEach((obj) => promises.push(callback(obj)));

  return await Promise.all(promises);
};

const shuffle = (array) => {
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
  if(numberOfQuestions > NUMBER_OF_AVAILABLE_QUESTIONS) {
    throw 'You ask too many questions!';
  }
  const orderedArray = Array.from(Array(NUMBER_OF_AVAILABLE_QUESTIONS + 1).keys()).slice(1, NUMBER_OF_AVAILABLE_QUESTIONS + 1);
  const shuffledArray = shuffle(orderedArray);
  return shuffledArray.slice(0, numberOfQuestions);
}