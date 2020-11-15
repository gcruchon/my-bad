import { render, fireEvent } from '@testing-library/svelte';

import MockCollectionEnterChoiceLoading from './__mocks__/MockCollectionEnterChoiceLoading.svelte';
import MockCollectionEnterChoiceEmpty from './__mocks__/MockCollectionEnterChoiceEmpty.svelte';
import MockCollectionEnterChoiceTwoPlayers from './__mocks__/MockCollectionEnterChoiceTwoPlayers.svelte';
import MockCollectionEnterChoiceOnePlayerNoAnswer from './__mocks__/MockCollectionEnterChoiceOnePlayerNoAnswer.svelte';
import MockCollectionEnterChoiceOnePlayerOneAnswerError from './__mocks__/MockCollectionEnterChoiceOnePlayerOneAnswerError.svelte';
import MockCollectionEnterChoiceOnePlayerOneAnswerFailure from './__mocks__/MockCollectionEnterChoiceOnePlayerOneAnswerFailure.svelte';
import MockCollectionEnterChoiceOnePlayerOneAnswerMistake from './__mocks__/MockCollectionEnterChoiceOnePlayerOneAnswerMistake.svelte';
import MockCollectionEnterChoiceOnePlayerOneAnswerUnkownType from './__mocks__/MockCollectionEnterChoiceOnePlayerOneAnswerUnkownType.svelte';
import MockCollectionEnterChoiceOnePlayerTwoAnswers from './__mocks__/MockCollectionEnterChoiceOnePlayerTwoAnswers.svelte';

const mockSaveAnswer = jest.fn();
jest.mock('./player', () => {
  return {
    __esModule: true,
    default: { saveAnswer: mockSaveAnswer },
    saveAnswer: mockSaveAnswer,
  };
});

const game = {
  id: 'ThisIsALongGameID',
  shortId: 'SHORTID1',
  state: 'question',
  currentQuestionIndex: 0,
  questions: [1, 2, 3],
  createdAt: new Date(2020, 10, 15, 9, 45, 0),
};
const gameTooLateToAnswer = {
  id: 'ThisIsALongGameID',
  shortId: 'SHORTID2',
  state: 'showResults',
  currentQuestionIndex: 0,
  questions: [1, 2, 3],
  createdAt: new Date(2020, 10, 15, 9, 45, 0),
};
const tests = [
  {
    type: 'error',
    text: 'erreur',
    mock: MockCollectionEnterChoiceOnePlayerOneAnswerError,
  },
  {
    type: 'failure',
    text: 'échec',
    mock: MockCollectionEnterChoiceOnePlayerOneAnswerFailure,
  },
  {
    type: 'mistake',
    text: 'faute',
    mock: MockCollectionEnterChoiceOnePlayerOneAnswerMistake,
  },
];

describe('PlayerEnterChoice', () => {
  const setupMockModules = Collection => {
    jest.resetModules();
    const mockedFunctions = {
      Collection,
    };
    jest.doMock('sveltefire', () => {
      return {
        __esModule: true,
        default: mockedFunctions,
        ...mockedFunctions,
      };
    });
    jest.doMock('svelte-routing');
  };
  it('should handle loading players', async () => {
    setupMockModules(MockCollectionEnterChoiceLoading);
    await import('sveltefire');
    let PlayerEnterChoice = await import('./PlayerEnterChoice.svelte');
    const { queryAllByText, container } = render(PlayerEnterChoice, {
      props: {
        userId: 'my-long-useirId',
        game,
      },
    });

    expect(container).toContainHTML('Chargement en cours...');

    expect(container).not.toContainHTML(
      "Vous n'êtes pas inscrit à ce jeu... désolé",
    );
    expect(
      queryAllByText(
        "Nous avons trouvé plusieurs joueurs vous correspondant, c'est embarrassant...",
      ),
    ).toHaveLength(0);
    expect(container).not.toContainHTML("Pour vous, c'est :");
    expect(container).not.toContainHTML(
      "Trop tard, vous n'avez pas répondu...",
    );
    expect(
      queryAllByText(
        "Nous avons trouvé plusieurs réponses pour cette question, c'est embarrassant...",
      ),
    ).toHaveLength(0);
  });
  it('should handle when player is not found', async () => {
    setupMockModules(MockCollectionEnterChoiceEmpty);
    await import('sveltefire');
    let PlayerEnterChoice = await import('./PlayerEnterChoice.svelte');
    const { queryAllByText, container } = render(PlayerEnterChoice, {
      props: {
        userId: 'my-long-useirId',
        game,
      },
    });

    expect(container).toContainHTML(
      "Vous n'êtes pas inscrit à ce jeu... désolé",
    );
    expect(container).not.toContainHTML('Chargement en cours...');
    expect(
      queryAllByText(
        "Nous avons trouvé plusieurs joueurs vous correspondant, c'est embarrassant...",
      ),
    ).toHaveLength(0);
    expect(container).not.toContainHTML("Pour vous, c'est :");
    expect(container).not.toContainHTML(
      "Trop tard, vous n'avez pas répondu...",
    );
    expect(
      queryAllByText(
        "Nous avons trouvé plusieurs réponses pour cette question, c'est embarrassant...",
      ),
    ).toHaveLength(0);
  });
  it('should handle when several players are not found', async () => {
    setupMockModules(MockCollectionEnterChoiceTwoPlayers);
    await import('sveltefire');
    let PlayerEnterChoice = await import('./PlayerEnterChoice.svelte');
    const { getByText, queryAllByText, container } = render(PlayerEnterChoice, {
      props: {
        userId: 'my-long-useirId',
        game,
      },
    });

    expect(
      getByText(
        "Nous avons trouvé plusieurs joueurs vous correspondant, c'est embarrassant...",
      ),
    ).toBeInTheDocument;

    expect(container).not.toContainHTML(
      "Vous n'êtes pas inscrit à ce jeu... désolé",
    );
    expect(container).not.toContainHTML('Chargement en cours...');
    expect(container).not.toContainHTML("Pour vous, c'est :");
    expect(container).not.toContainHTML(
      "Trop tard, vous n'avez pas répondu...",
    );
    expect(
      queryAllByText(
        "Nous avons trouvé plusieurs réponses pour cette question, c'est embarrassant...",
      ),
    ).toHaveLength(0);
  });
  it('should handle when one player has several answers', async () => {
    setupMockModules(MockCollectionEnterChoiceOnePlayerTwoAnswers);
    await import('sveltefire');
    let PlayerEnterChoice = await import('./PlayerEnterChoice.svelte');
    const { getByText, queryAllByText, container } = render(PlayerEnterChoice, {
      props: {
        userId: 'my-long-useirId',
        game,
      },
    });

    expect(
      getByText(
        "Nous avons trouvé plusieurs réponses pour cette question, c'est embarrassant...",
      ),
    ).toBeInTheDocument;

    expect(container).not.toContainHTML(
      "Vous n'êtes pas inscrit à ce jeu... désolé",
    );
    expect(
      queryAllByText(
        "Nous avons trouvé plusieurs joueurs vous correspondant, c'est embarrassant...",
      ),
    ).toHaveLength(0);
    expect(container).not.toContainHTML('Chargement en cours...');
    expect(container).not.toContainHTML("Pour vous, c'est :");
    expect(container).not.toContainHTML(
      "Trop tard, vous n'avez pas répondu...",
    );
  });
  tests.forEach(test => {
    it(`should handle when one player one answer of type "${test.type}"`, async () => {
      setupMockModules(test.mock);
      await import('sveltefire');
      let PlayerEnterChoice = await import('./PlayerEnterChoice.svelte');
      const { getByText, queryAllByText, container } = render(
        PlayerEnterChoice,
        {
          props: {
            userId: 'my-long-useirId',
            game,
          },
        },
      );

      expect(container).toContainHTML("Pour vous, c'est");
      let span = getByText(test.text);
      expect(span).toHaveClass(test.type);

      expect(container).not.toContainHTML(
        "Vous n'êtes pas inscrit à ce jeu... désolé",
      );
      expect(
        queryAllByText(
          "Nous avons trouvé plusieurs joueurs vous correspondant, c'est embarrassant...",
        ),
      ).toHaveLength(0);
      expect(container).not.toContainHTML('Chargement en cours...');
      expect(container).not.toContainHTML(
        "Trop tard, vous n'avez pas répondu...",
      );
      expect(
        queryAllByText(
          "Nous avons trouvé plusieurs réponses pour cette question, c'est embarrassant...",
        ),
      ).toHaveLength(0);
    });
  });
  it(`should handle when one player one answer of aknown type`, async () => {
    setupMockModules(MockCollectionEnterChoiceOnePlayerOneAnswerUnkownType);
    await import('sveltefire');
    let PlayerEnterChoice = await import('./PlayerEnterChoice.svelte');
    const { queryAllByText, container } = render(PlayerEnterChoice, {
      props: {
        userId: 'my-long-useirId',
        game,
      },
    });

    expect(container).toContainHTML("Pour vous, c'est");
    expect(container).toContainHTML('une réponse de type inconnu...');

    expect(container).not.toContainHTML(
      "Vous n'êtes pas inscrit à ce jeu... désolé",
    );
    expect(
      queryAllByText(
        "Nous avons trouvé plusieurs joueurs vous correspondant, c'est embarrassant...",
      ),
    ).toHaveLength(0);
    expect(container).not.toContainHTML('Chargement en cours...');
    expect(container).not.toContainHTML(
      "Trop tard, vous n'avez pas répondu...",
    );
    expect(
      queryAllByText(
        "Nous avons trouvé plusieurs réponses pour cette question, c'est embarrassant...",
      ),
    ).toHaveLength(0);
  });
  it(`should handle when one player who did not answer yet`, async () => {
    setupMockModules(MockCollectionEnterChoiceOnePlayerNoAnswer);
    await import('sveltefire');
    let PlayerEnterChoice = await import('./PlayerEnterChoice.svelte');
    const { getByText, queryAllByText, container } = render(PlayerEnterChoice, {
      props: {
        userId: 'my-long-useirId',
        game,
      },
    });

    expect(container).toContainHTML("Pour vous, c'est :");
    let spanError = getByText('erreur');
    expect(spanError).toHaveClass('error');
    await fireEvent.click(spanError.parentElement);
    expect(mockSaveAnswer).toHaveBeenCalledTimes(1);
    expect(mockSaveAnswer.mock.calls[0][1]).toEqual(1);
    expect(mockSaveAnswer.mock.calls[0][2]).toEqual('error');

    let spanMistake = getByText('faute');
    expect(spanMistake).toHaveClass('mistake');
    await fireEvent.click(spanMistake.parentElement);
    expect(mockSaveAnswer).toHaveBeenCalledTimes(2);
    expect(mockSaveAnswer.mock.calls[1][1]).toEqual(1);
    expect(mockSaveAnswer.mock.calls[1][2]).toEqual('mistake');

    let spanFailure = getByText('échec');
    expect(spanFailure).toHaveClass('failure');
    await fireEvent.click(spanFailure.parentElement);
    expect(mockSaveAnswer).toHaveBeenCalledTimes(3);
    expect(mockSaveAnswer.mock.calls[2][1]).toEqual(1);
    expect(mockSaveAnswer.mock.calls[2][2]).toEqual('failure');

    expect(container).not.toContainHTML(
      "Vous n'êtes pas inscrit à ce jeu... désolé",
    );
    expect(
      queryAllByText(
        "Nous avons trouvé plusieurs joueurs vous correspondant, c'est embarrassant...",
      ),
    ).toHaveLength(0);
    expect(container).not.toContainHTML('Chargement en cours...');
    expect(container).not.toContainHTML(
      "Trop tard, vous n'avez pas répondu...",
    );
    expect(
      queryAllByText(
        "Nous avons trouvé plusieurs réponses pour cette question, c'est embarrassant...",
      ),
    ).toHaveLength(0);
  });
  it(`should handle when one player who did not answer yet but it's too late...`, async () => {
    setupMockModules(MockCollectionEnterChoiceOnePlayerNoAnswer);
    await import('sveltefire');
    let PlayerEnterChoice = await import('./PlayerEnterChoice.svelte');
    const { getByText, queryAllByText, container } = render(PlayerEnterChoice, {
      props: {
        userId: 'my-long-useirId',
        game: gameTooLateToAnswer,
      },
    });

    expect(container).toContainHTML("Trop tard, vous n'avez pas répondu...");
    expect(container).not.toContainHTML("Pour vous, c'est :");

    expect(container).not.toContainHTML(
      "Vous n'êtes pas inscrit à ce jeu... désolé",
    );
    expect(
      queryAllByText(
        "Nous avons trouvé plusieurs joueurs vous correspondant, c'est embarrassant...",
      ),
    ).toHaveLength(0);
    expect(container).not.toContainHTML('Chargement en cours...');
    expect(
      queryAllByText(
        "Nous avons trouvé plusieurs réponses pour cette question, c'est embarrassant...",
      ),
    ).toHaveLength(0);
  });
});
