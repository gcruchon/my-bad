import { mockFirebase }  from 'firestore-jest-mock';
import { mockCollection } from 'firestore-jest-mock/mocks/firestore';
import { getAnswers, showPlayers } from './question';

describe('getAnswers', () => {
  it('should add an answer', async () => {
    mockFirebase({
      database: {
        players: [],
      },
    });
    const firebase = require('firebase');
    const db = firebase.firestore();

    await getAnswers(db, 'SHORTID1', 1);
    expect(mockCollection).toHaveBeenCalledTimes(1);
    expect(mockCollection).toHaveBeenCalledWith('games/SHORTID1/players');
  });
});


describe('showPlayers', () => {
  it('should display a default string when no players', () => {
    const result = showPlayers([]);
    expect(result).toEqual('--');
  });
  it('should display the name of one player without comma', () => {
    const result = showPlayers([{name: 'Player'}]);
    expect(result).toEqual('Player');
  });
  it('should display the names of several players separated with commas', () => {
    const result = showPlayers([{name: 'Player 1'}, {name: 'Player 2'}, {name: 'Player 3'}]);
    expect(result).toEqual('Player 1, Player 2, Player 3');
  });
});
