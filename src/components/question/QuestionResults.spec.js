import { render } from '@testing-library/svelte';
import { getAnswers, showPlayers } from './question';

jest.mock('./question');

const game = {
  state: 'showResults',
  currentQuestionIndex: 1,
  questions: [1, 2, 3],
};

describe('QuestionResults', () => {
  it('should wait fot promise to resolve', async () => {
    let QuestionResults = await import('./QuestionResults.svelte');
    const { container } = render(QuestionResults, {
      props: {
        game: game,
        gameId: 'longGameId',
      },
    });
    expect(container).toContainHTML('Chargement de réponses en cours...');
  });
  it('should show results', async () => {
    let QuestionResults = await import('./QuestionResults.svelte');
    const { container } = render(QuestionResults, {
      props: {
        game: game,
        gameId: 'longGameId',
      },
    });
    await new Promise(setTimeout);
    expect(container).toContainHTML('Liste des résultats');
    expect(container).toContainHTML('"erreur" : Player One');
    expect(container).toContainHTML('"faute" : Player Two, Player Three');
    expect(container).toContainHTML('"échec" : --');
  });
});
