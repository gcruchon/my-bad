import utils from './utils';

const reversedArray = [
  20,
  19,
  18,
  17,
  16,
  15,
  14,
  13,
  12,
  11,
  10,
  9,
  8,
  7,
  6,
  5,
  4,
  3,
  2,
  1,
];

const mockMath = Object.create(global.Math);
mockMath.random = jest.fn().mockReturnValue(0.5);
global.Math = mockMath;

describe('shuffle', () => {
  it('should shuffle the array', () => {
    const randomized = utils.shuffle([1, 2, 3, 4, 5]);
    expect(randomized).toEqual([1, 4, 2, 5, 3]);
  });
});
describe('getRandomQuestions', () => {
  it('should thrown an error if called with 21', () => {
    expect(() => {
      utils.getRandomQuestions(21);
    }).toThrow('You ask too many questions!');
  });

  it('should get a random array', () => {
    utils.shuffle = jest.fn().mockReturnValue(reversedArray);
    const randomized = utils.getRandomQuestions(20);
    expect(utils.shuffle).toHaveBeenCalledTimes(1);
    expect(randomized).toEqual(reversedArray);
  });

  it('should slice array whenn called with 5', () => {
    utils.shuffle = jest.fn().mockReturnValue(reversedArray);
    const randomized = utils.getRandomQuestions(5);
    expect(utils.shuffle).toHaveBeenCalledTimes(1);
    expect(randomized).toEqual([20, 19, 18, 17, 16]);
  });
});
