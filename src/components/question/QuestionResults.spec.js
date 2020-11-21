import { render } from '@testing-library/svelte';
import { getAnswers, showPlayers } from './question';

jest.mock('./question');

const game = {
  state: 'showResults',
  currentQuestionIndex: 1,
  questions: [1, 2, 3],
};

describe('QuestionResults', () => {
  afterEach(() => {
    getAnswers.mockClear();
    showPlayers.mockClear();
  });
  it('should wait fot promise to resolve', async () => {
    const QuestionResults = await import('./QuestionResults.svelte');
    const { container } = render(QuestionResults, {
      props: {
        game: game,
        gameId: 'longGameId',
      },
    });
    expect(container).toContainHTML('Chargement de réponses en cours...');
    expect(getAnswers).toBeCalledTimes(1);
  });
  it('should show results', async () => {
    const QuestionResults = await import('./QuestionResults.svelte');
    const { container } = render(QuestionResults, {
      props: {
        game: game,
        gameId: 'longGameId',
      },
    });
    await new Promise(setTimeout);
    expect(container).toContainHTML('Liste des résultats');
    expect(getAnswers).toBeCalledTimes(1);
    expect(showPlayers).toBeCalledTimes(3);
    expect(showPlayers.mock.calls[0][0]).toEqual([
      { userId: 'Player1', name: 'Player One' },
    ]);
    expect(showPlayers.mock.calls[1][0]).toEqual([
      { userId: 'Player2', name: 'Player Two' },
      { userId: 'Player3', name: 'Player Three' },
    ]);
    expect(showPlayers.mock.calls[2][0]).toEqual([]);
  });
});
