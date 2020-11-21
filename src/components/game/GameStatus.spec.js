import { render } from '@testing-library/svelte';
import GameStatus from './GameStatus.svelte';

const gameNotStarted = {
  state: 'waitingForPlayers',
  currentQuestionIndex: 0,
  questions: [1, 2, 3],
};
const gameStarted = {
  currentQuestionIndex: 1,
  questions: [1, 2, 3],
};

describe('GameStatus', () => {
  it('should fail beautifully game has an unknown state', async () => {
    const strangeGame = {
      state: 'WTF',
      ...gameStarted
    }
    const { container } = render(GameStatus, {
      props: {
        game: strangeGame,
      },
    });
    expect(container).toContainHTML('Statut inconnu "WTF"');
  });
  it('should show a disclaimer when game is not started', async () => {
    const { container } = render(GameStatus, {
      props: {
        game: gameNotStarted,
      },
    });
    expect(container).toContainHTML('En attente de joueurs');
  });
  ['preQuestion', 'question', 'showResults', 'showAnswer'].forEach(state => {
    it(`should show question number when status is '${state}'`, async () => {
      const game = {
        state,
        ...gameStarted
      }
      const { container } = render(GameStatus, {
        props: {
          game,
        },
      });
      expect(container).toContainHTML('Question n°2');
    });
  });
});
