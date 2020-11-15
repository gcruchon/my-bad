import { saveAnswer, addPlayer } from './player';

describe('saveAnswer', () => {
  it('should add an answer', () => {
    const answersRef = {
      add: jest.fn(),
    };
    saveAnswer(answersRef, 12, 'error');
    expect(answersRef.add).toHaveBeenCalledTimes(1);
    const call = answersRef.add.mock.calls[0][0];
    expect(call.questionId).toEqual(12);
    expect(call.value).toEqual('error');
  });
});

describe('addPlayer', () => {
  it('should add a player to the game', () => {
    const playersRef = {
      add: jest.fn(),
    };
    addPlayer(playersRef, 'playerId', 'playerName');
    expect(playersRef.add).toHaveBeenCalledTimes(1);
    const call = playersRef.add.mock.calls[0][0];
    expect(call.userId).toEqual('playerId');
    expect(call.name).toEqual('playerName');
  });
});
