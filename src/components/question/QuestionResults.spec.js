import { render } from '@testing-library/svelte';

const mockGetAnswers = jest.fn().mockImplementation(() => {
  return new Promise((resolve, reject) => {
    resolve({
      errors: ['Player1'],
      mistakes: ['Player2', 'Player3'],
      failures: [],
    });
  });
});
jest.mock('./question', () => {
  return {
    __esModule: true,
    default: { getAnswers: mockGetAnswers },
    getAnswers: mockGetAnswers,
  };
});

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
    expect(container).toContainHTML('"erreur" : 1');
    expect(container).toContainHTML('"faute" : 2');
    expect(container).toContainHTML('"échec" : 0');
  });
});
