import utils from './utils';

describe('asyncForEach', () => {
  const waitForIt = (ms) => new Promise(r => setTimeout(r, 50));
  const mock1 = jest.fn();
  const mock2 = jest.fn();
  const mock3 = jest.fn();
  const arrayOfMocks = [
    mock1,
    mock2,
    mock3
  ];
  beforeEach(() => {
    mock1.mockReset();
    mock2.mockReset();
    mock3.mockReset();
  });
  it('should run all promises in the array', async () => {
    await utils.asyncForEach(arrayOfMocks, async (mock) => {
      await waitForIt();
      mock();
    });
    expect(mock1).toHaveBeenCalledTimes(1);
    expect(mock2).toHaveBeenCalledTimes(1);
    expect(mock3).toHaveBeenCalledTimes(1);
  });
});

describe('shuffle', () => {
  const originalMath = global.Math
  const mockMath = Object.create(global.Math);

  beforeAll(()=> {
    mockMath.random = jest.fn().mockReturnValue(0.5);
    global.Math = mockMath;
  });

  afterAll(()=> {
    global.Math = originalMath;
  });

  it('should shuffle the array', () => {
    const randomized = utils.shuffle([1, 2, 3, 4, 5]);
    expect(randomized).toEqual([1, 4, 2, 5, 3]);
  });
});

describe('getRandomQuestions', () => {
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
  beforeEach(() => {
    utils.shuffle = jest.fn().mockReturnValue(reversedArray);
  });

  it('should thrown an error if called with 21', () => {
    expect(() => {
      utils.getRandomQuestions(21);
    }).toThrow('You ask too many questions!');
  });

  it('should get a random array', () => {
    const randomized = utils.getRandomQuestions(20);
    expect(utils.shuffle).toHaveBeenCalledTimes(1);
    expect(randomized).toEqual(reversedArray);
  });

  it('should slice array when called with 5', () => {
    const randomized = utils.getRandomQuestions(5);
    expect(utils.shuffle).toHaveBeenCalledTimes(1);
    expect(randomized).toEqual([20, 19, 18, 17, 16]);
  });
});
