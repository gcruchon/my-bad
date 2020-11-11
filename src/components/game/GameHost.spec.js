import { render, fireEvent } from '@testing-library/svelte';

import MockDocGameNotFound from './__mocks__/MockDocGameNotFound.svelte';
import MockDocGameNotStarted from './__mocks__/MockDocGameNotStarted.svelte';
import MockDocGameLoading from './__mocks__/MockDocGameLoading.svelte';
import MockDocGamePreQuestion from './__mocks__/MockDocGamePreQuestion.svelte';
import MockDocGameQuestion from './__mocks__/MockDocGameQuestion.svelte';
import MockDocGameShowResults from './__mocks__/MockDocGameShowResults.svelte';
import MockDocGameShowAnswer from './__mocks__/MockDocGameShowAnswer.svelte';
import MockDocGameFinished from './__mocks__/MockDocGameFinished.svelte';

jest.mock('./GameHeader.svelte');
jest.mock('./GamePlayerList.svelte');
jest.mock('./GameButtons.svelte');
jest.mock('./GameFinish.svelte');
jest.mock('./GameSeeAnswerButton.svelte');
jest.mock('../host/HostCountDown.svelte');
jest.mock('../question/QuestionCountAnswers.svelte');
jest.mock('../question/QuestionHeader.svelte');
jest.mock('../question/QuestionResults.svelte');
jest.mock('../question/QuestionText.svelte');

describe('GameHost', () => {
  const setupMockModules = Doc => {
    jest.resetModules();
    const mockedFunctions = {
      Doc,
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
  it('should handle game not found', async () => {
    setupMockModules(MockDocGameNotFound);
    await import('sveltefire');
    let { navigate } = await import('svelte-routing');
    let GameHost = await import('./GameHost.svelte');
    const { getByText, container } = render(GameHost, {
      props: {
        gameId: 'ABCDEF',
      },
    });

    expect(container).toContainHTML('Aucun jeu trouvé avec cet ID ("ABCDEF").');

    expect(container).not.toContainHTML('Chargement du jeu...');
    expect(container).not.toContainHTML('<div>GameHeader</div>');
    expect(container).not.toContainHTML('<div>GamePlayerList</div>');
    expect(container).not.toContainHTML('<div>QuestionHeader</div>');
    expect(container).not.toContainHTML('<div>HostCountDown</div>');
    expect(container).not.toContainHTML('<div>QuestionCountAnswers</div>');
    expect(container).not.toContainHTML('<div>QuestionText</div>');
    expect(container).not.toContainHTML('<div>QuestionResults</div>');
    expect(container).not.toContainHTML('<div>GameButtons</div>');
    expect(container).not.toContainHTML('<div>GameFinish</div>');
    expect(container).not.toContainHTML('<div>GameSeeAnswerButton</div>');

    const buttonHome = getByText(/Retourner à l'accueil de l'animateur/i);
    expect(buttonHome).toBeInTheDocument();
    expect(buttonHome).toBeInstanceOf(HTMLButtonElement);
    await fireEvent.click(buttonHome);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/host');
  });
  it('should show a loading message', async () => {
    setupMockModules(MockDocGameLoading);
    await import('sveltefire');
    let GameHost = await import('./GameHost.svelte');
    const { container } = render(GameHost, {
      props: {
        gameId: 'ABCDEF',
      },
    });

    expect(container).toContainHTML('Chargement du jeu...');

    expect(container).not.toContainHTML(
      'Aucun jeu trouvé avec cet ID ("ABCDEF").',
    );
    expect(container).not.toContainHTML('<div>GameHeader</div>');
    expect(container).not.toContainHTML('<div>GamePlayerList</div>');
    expect(container).not.toContainHTML('<div>QuestionHeader</div>');
    expect(container).not.toContainHTML('<div>HostCountDown</div>');
    expect(container).not.toContainHTML('<div>QuestionCountAnswers</div>');
    expect(container).not.toContainHTML('<div>QuestionText</div>');
    expect(container).not.toContainHTML('<div>QuestionResults</div>');
    expect(container).not.toContainHTML('<div>GameButtons</div>');
    expect(container).not.toContainHTML('<div>GameFinish</div>');
    expect(container).not.toContainHTML('<div>GameSeeAnswerButton</div>');
  });
  it('should render a not started game', async () => {
    setupMockModules(MockDocGameNotStarted);
    await import('sveltefire');
    let GameHost = await import('./GameHost.svelte');
    const { container } = render(GameHost, {
      props: {
        gameId: 'ABCDEF',
      },
    });

    expect(container).toContainHTML('<div>GameHeader</div>');
    expect(container).toContainHTML('<div>GamePlayerList</div>');

    expect(container).not.toContainHTML(
      'Aucun jeu trouvé avec cet ID ("ABCDEF").',
    );
    expect(container).not.toContainHTML('Chargement du jeu...');
    expect(container).not.toContainHTML('<div>QuestionHeader</div>');
    expect(container).not.toContainHTML('<div>HostCountDown</div>');
    expect(container).not.toContainHTML('<div>QuestionCountAnswers</div>');
    expect(container).not.toContainHTML('<div>QuestionText</div>');
    expect(container).not.toContainHTML('<div>QuestionResults</div>');
    expect(container).not.toContainHTML('<div>GameButtons</div>');
    expect(container).not.toContainHTML('<div>GameFinish</div>');
    expect(container).not.toContainHTML('<div>GameSeeAnswerButton</div>');
  });
  it('should render a game in "preQuestion" state', async () => {
    setupMockModules(MockDocGamePreQuestion);
    await import('sveltefire');
    let GameHost = await import('./GameHost.svelte');
    const { container } = render(GameHost, {
      props: {
        gameId: 'ABCDEF',
      },
    });

    expect(container).toContainHTML('<div>GameHeader</div>');
    expect(container).toContainHTML('<div>QuestionHeader</div>');
    expect(container).toContainHTML('<div>HostCountDown</div>');

    expect(container).not.toContainHTML(
      'Aucun jeu trouvé avec cet ID ("ABCDEF").',
    );
    expect(container).not.toContainHTML('Chargement du jeu...');
    expect(container).not.toContainHTML('<div>QuestionCountAnswers</div>');
    expect(container).not.toContainHTML('<div>QuestionText</div>');
    expect(container).not.toContainHTML('<div>QuestionResults</div>');
    expect(container).not.toContainHTML('<div>GameButtons</div>');
    expect(container).not.toContainHTML('<div>GameFinish</div>');
    expect(container).not.toContainHTML('<div>GameSeeAnswerButton</div>');
  });
  it('should render a game in "question" state', async () => {
    setupMockModules(MockDocGameQuestion);
    await import('sveltefire');
    let GameHost = await import('./GameHost.svelte');
    const { container } = render(GameHost, {
      props: {
        gameId: 'ABCDEF',
      },
    });

    expect(container).toContainHTML('<div>GameHeader</div>');
    expect(container).toContainHTML('<div>QuestionHeader</div>');
    expect(container).toContainHTML('<div>HostCountDown</div>');
    expect(container).toContainHTML('<div>QuestionCountAnswers</div>');
    expect(container).toContainHTML('<div>QuestionText</div>');

    expect(container).not.toContainHTML(
      'Aucun jeu trouvé avec cet ID ("ABCDEF").',
    );
    expect(container).not.toContainHTML('Chargement du jeu...');
    expect(container).not.toContainHTML('<div>QuestionResults</div>');
    expect(container).not.toContainHTML('<div>GameButtons</div>');
    expect(container).not.toContainHTML('<div>GameFinish</div>');
    expect(container).not.toContainHTML('<div>GameSeeAnswerButton</div>');
  });
  it('should render a game in "showResults" state', async () => {
    setupMockModules(MockDocGameShowResults);
    await import('sveltefire');
    let GameHost = await import('./GameHost.svelte');
    const { container } = render(GameHost, {
      props: {
        gameId: 'ABCDEF',
      },
    });

    expect(container).toContainHTML('<div>GameHeader</div>');
    expect(container).toContainHTML('<div>QuestionHeader</div>');
    expect(container).toContainHTML('<div>QuestionText</div>');
    expect(container).toContainHTML('<div>QuestionResults</div>');
    expect(container).toContainHTML('<div>GameSeeAnswerButton</div>');

    expect(container).not.toContainHTML(
      'Aucun jeu trouvé avec cet ID ("ABCDEF").',
    );
    expect(container).not.toContainHTML('Chargement du jeu...');
    expect(container).not.toContainHTML('<div>HostCountDown</div>');
    expect(container).not.toContainHTML('<div>QuestionCountAnswers</div>');
    expect(container).not.toContainHTML('<div>GameButtons</div>');
    expect(container).not.toContainHTML('<div>GameFinish</div>');
  });
  it('should render a game in "showAnswer" state', async () => {
    setupMockModules(MockDocGameShowAnswer);
    await import('sveltefire');
    let GameHost = await import('./GameHost.svelte');
    const { container } = render(GameHost, {
      props: {
        gameId: 'ABCDEF',
      },
    });

    expect(container).toContainHTML('<div>GameHeader</div>');
    expect(container).toContainHTML('<div>QuestionHeader</div>');
    expect(container).toContainHTML('<div>QuestionText</div>');
    expect(container).toContainHTML('<div>GameButtons</div>');

    expect(container).not.toContainHTML(
      'Aucun jeu trouvé avec cet ID ("ABCDEF").',
    );
    expect(container).not.toContainHTML('Chargement du jeu...');
    expect(container).not.toContainHTML('<div>HostCountDown</div>');
    expect(container).not.toContainHTML('<div>QuestionCountAnswers</div>');
    expect(container).not.toContainHTML('<div>QuestionResults</div>');
    expect(container).not.toContainHTML('<div>GameFinish</div>');
    expect(container).not.toContainHTML('<div>GameSeeAnswerButton</div>');
  });
  it('should render a finished game', async () => {
    setupMockModules(MockDocGameFinished);
    await import('sveltefire');
    let GameHost = await import('./GameHost.svelte');
    const { container } = render(GameHost, {
      props: {
        gameId: 'ABCDEF',
      },
    });

    expect(container).toContainHTML('<div>GameHeader</div>');
    expect(container).toContainHTML('<div>GameFinish</div>');

    expect(container).not.toContainHTML(
      'Aucun jeu trouvé avec cet ID ("ABCDEF").',
    );
    expect(container).not.toContainHTML('Chargement du jeu...');
    expect(container).not.toContainHTML('<div>HostCountDown</div>');
    expect(container).not.toContainHTML('<div>QuestionCountAnswers</div>');
    expect(container).not.toContainHTML('<div>QuestionResults</div>');
    expect(container).not.toContainHTML('<div>QuestionHeader</div>');
    expect(container).not.toContainHTML('<div>QuestionText</div>');
    expect(container).not.toContainHTML('<div>GameButtons</div>');
    expect(container).not.toContainHTML('<div>GameSeeAnswerButton</div>');
  });
});
