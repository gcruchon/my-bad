import { render, fireEvent } from '@testing-library/svelte';

import MockCollectionHomeLoading from './__mocks__/MockCollectionHomeLoading.svelte';
import MockCollectionHomeEmpty from './__mocks__/MockCollectionHomeEmpty.svelte';
import MockCollectionHomeTwoGames from './__mocks__/MockCollectionHomeTwoGames.svelte';
import MockCollectionHomeOneGameUnknownStatus from './__mocks__/MockCollectionHomeOneGameUnknownStatus.svelte';
import MockCollectionHomeOneGameWaitingForPlayers from './__mocks__/MockCollectionHomeOneGameWaitingForPlayers.svelte';
import MockCollectionHomeOneGamePreQuestion from './__mocks__/MockCollectionHomeOneGamePreQuestion.svelte';
import MockCollectionHomeOneGameQuestion from './__mocks__/MockCollectionHomeOneGameQuestion.svelte';
import MockCollectionHomeOneGameShowResults from './__mocks__/MockCollectionHomeOneGameShowResults.svelte';
import MockCollectionHomeOneGameShowAnswer from './__mocks__/MockCollectionHomeOneGameShowAnswer.svelte';
import MockCollectionHomeOneGameFinished from './__mocks__/MockCollectionHomeOneGameFinished.svelte';

jest.mock('./PlayerEnterName.svelte');
jest.mock('./PlayerEnterChoice.svelte');
jest.mock('../game/GameHeader.svelte');
jest.mock('../game/GameFinish.svelte');
jest.mock('../question/QuestionHeader.svelte');

const duringQuestionStates = [
  {
    state: 'question',
    mock: MockCollectionHomeOneGameQuestion,
  },
  {
    state: 'showResults',
    mock: MockCollectionHomeOneGameShowResults,
  },
  {
    state: 'showAnswer',
    mock: MockCollectionHomeOneGameShowAnswer,
  },
];

describe('PlayerHome', () => {
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
  it('should handle loading game', async () => {
    setupMockModules(MockCollectionHomeLoading);
    await import('sveltefire');
    let PlayerHome = await import('./PlayerHome.svelte');
    const { container } = render(PlayerHome, {
      props: {
        userId: 'my-long-useirId',
        gameShortId: 'SHORTID1',
      },
    });

    expect(container).toContainHTML('Chargement en cours...');

    expect(container).not.toContainHTML(`<div>GameHeader</div>`);
    expect(container).not.toContainHTML(`<div>QuestionHeader</div>`);
    expect(container).not.toContainHTML(`<div>PlayerEnterChoice</div>`);
    expect(container).not.toContainHTML(`<div>GameFinish</div>`);
    expect(container).not.toContainHTML(`Tenez-vous prêt.e !`);
    expect(container).not.toContainHTML(`Statut non géré`);
    expect(container).not.toContainHTML(
      "Nous n'avons pas trouvé le jeu avec l'ID ",
    );
    expect(container).not.toContainHTML(
      `Nous avons trouvé plusieurs jeux avec ce l'ID `,
    );
  });
  it('should handle when player is not found', async () => {
    setupMockModules(MockCollectionHomeEmpty);
    await import('sveltefire');
    let { navigate } = await import('svelte-routing');
    let PlayerHome = await import('./PlayerHome.svelte');
    const { getByText, container } = render(PlayerHome, {
      props: {
        userId: 'my-long-useirId',
        gameShortId: 'SHORTID1',
      },
    });

    expect(container).toContainHTML(
      `Nous n'avons pas trouvé le jeu avec l'ID "SHORTID1"`,
    );
    const buttonBack = getByText('Saisir un autre ID de jeu');
    await fireEvent.click(buttonBack);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/player');

    expect(container).not.toContainHTML(`<div>GameHeader</div>`);
    expect(container).not.toContainHTML(`<div>QuestionHeader</div>`);
    expect(container).not.toContainHTML(`<div>PlayerEnterChoice</div>`);
    expect(container).not.toContainHTML(`<div>GameFinish</div>`);
    expect(container).not.toContainHTML(`Tenez-vous prêt.e !`);
    expect(container).not.toContainHTML('Chargement en cours...');
    expect(container).not.toContainHTML(`Statut non géré`);
  });
  it('should handle when several games are not found', async () => {
    setupMockModules(MockCollectionHomeTwoGames);
    await import('sveltefire');
    let { navigate } = await import('svelte-routing');
    let PlayerHome = await import('./PlayerHome.svelte');
    const { getByText, container } = render(PlayerHome, {
      props: {
        userId: 'my-long-useirId',
        gameShortId: 'SHORTID1',
      },
    });
    expect(container).toContainHTML(
      `Nous avons trouvé plusieurs jeux avec ce l'ID "SHORTID1", c'est embarrassant...`,
    );
    const buttonBack = getByText('Saisir un autre ID de jeu');
    await fireEvent.click(buttonBack);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/player');

    expect(container).not.toContainHTML('Chargement en cours...');
    expect(container).not.toContainHTML(`<div>GameHeader</div>`);
    expect(container).not.toContainHTML(`<div>QuestionHeader</div>`);
    expect(container).not.toContainHTML(`<div>PlayerEnterChoice</div>`);
    expect(container).not.toContainHTML(`<div>GameFinish</div>`);
    expect(container).not.toContainHTML(`Tenez-vous prêt.e !`);
    expect(container).not.toContainHTML(`Statut non géré`);
  });
  it('should handle a game with a strange status', async () => {
    setupMockModules(MockCollectionHomeOneGameUnknownStatus);
    await import('sveltefire');
    let PlayerHome = await import('./PlayerHome.svelte');
    const { container } = render(PlayerHome, {
      props: {
        userId: 'my-long-useirId',
        gameShortId: 'SHORTID1',
      },
    });
    expect(container).toContainHTML(`<div>GameHeader</div>`);
    expect(container).toContainHTML(`<div>QuestionHeader</div>`);
    expect(container).toContainHTML(`Statut non géré`);

    expect(container).not.toContainHTML('Chargement en cours...');
    expect(container).not.toContainHTML(`Tenez-vous prêt.e !`);
    expect(container).not.toContainHTML(`<div>PlayerEnterChoice</div>`);
    expect(container).not.toContainHTML(`<div>GameFinish</div>`);
    expect(container).not.toContainHTML(
      "Nous n'avons pas trouvé le jeu avec l'ID ",
    );
    expect(container).not.toContainHTML(
      `Nous avons trouvé plusieurs jeux avec ce l'ID `,
    );
  });
  it('should handle a game waiting for players', async () => {
    setupMockModules(MockCollectionHomeOneGameWaitingForPlayers);
    await import('sveltefire');
    let PlayerHome = await import('./PlayerHome.svelte');
    const { container } = render(PlayerHome, {
      props: {
        userId: 'my-long-useirId',
        gameShortId: 'SHORTID1',
      },
    });
    expect(container).toContainHTML(`<div>GameHeader</div>`);
    expect(container).toContainHTML(`<div>PlayerEnterName</div>`);

    expect(container).not.toContainHTML('Chargement en cours...');
    expect(container).not.toContainHTML(`<div>QuestionHeader</div>`);
    expect(container).not.toContainHTML(`<div>PlayerEnterChoice</div>`);
    expect(container).not.toContainHTML(`<div>GameFinish</div>`);
    expect(container).not.toContainHTML(`Tenez-vous prêt.e !`);
    expect(container).not.toContainHTML(`Statut non géré`);
    expect(container).not.toContainHTML(
      "Nous n'avons pas trouvé le jeu avec l'ID ",
    );
    expect(container).not.toContainHTML(
      `Nous avons trouvé plusieurs jeux avec ce l'ID `,
    );
  });
  it('should handle a game before a question', async () => {
    setupMockModules(MockCollectionHomeOneGamePreQuestion);
    await import('sveltefire');
    let PlayerHome = await import('./PlayerHome.svelte');
    const { container } = render(PlayerHome, {
      props: {
        userId: 'my-long-useirId',
        gameShortId: 'SHORTID1',
      },
    });
    expect(container).toContainHTML(`<div>GameHeader</div>`);
    expect(container).toContainHTML(`<div>QuestionHeader</div>`);
    expect(container).toContainHTML(`Tenez-vous prêt.e !`);

    expect(container).not.toContainHTML('Chargement en cours...');
    expect(container).not.toContainHTML(`<div>PlayerEnterName</div>`);
    expect(container).not.toContainHTML(`<div>PlayerEnterChoice</div>`);
    expect(container).not.toContainHTML(`<div>GameFinish</div>`);
    expect(container).not.toContainHTML(`Statut non géré`);
    expect(container).not.toContainHTML(
      "Nous n'avons pas trouvé le jeu avec l'ID ",
    );
    expect(container).not.toContainHTML(
      `Nous avons trouvé plusieurs jeux avec ce l'ID `,
    );
  });
  duringQuestionStates.forEach((duringQuestion) => {
    it(`should handle a game during a question (${duringQuestion.state})`, async () => {
      setupMockModules(duringQuestion.mock);
      await import('sveltefire');
      let PlayerHome = await import('./PlayerHome.svelte');
      const { container } = render(PlayerHome, {
        props: {
          userId: 'my-long-useirId',
          gameShortId: 'SHORTID1',
        },
      });
      expect(container).toContainHTML(`<div>GameHeader</div>`);
      expect(container).toContainHTML(`<div>QuestionHeader</div>`);
      expect(container).toContainHTML(`<div>PlayerEnterChoice</div>`);

      expect(container).not.toContainHTML('Chargement en cours...');
      expect(container).not.toContainHTML(`<div>PlayerEnterName</div>`);
      expect(container).not.toContainHTML(`<div>GameFinish</div>`);
      expect(container).not.toContainHTML(`Statut non géré`);
      expect(container).not.toContainHTML(`Tenez-vous prêt.e !`);
      expect(container).not.toContainHTML(
        "Nous n'avons pas trouvé le jeu avec l'ID ",
      );
      expect(container).not.toContainHTML(
        `Nous avons trouvé plusieurs jeux avec ce l'ID `,
      );
    });
  });
  it('should handle a finished game', async () => {
    setupMockModules(MockCollectionHomeOneGameFinished);
    await import('sveltefire');
    let PlayerHome = await import('./PlayerHome.svelte');
    const { container } = render(PlayerHome, {
      props: {
        userId: 'my-long-useirId',
        gameShortId: 'SHORTID1',
      },
    });
    expect(container).toContainHTML(`<div>GameHeader</div>`);
    expect(container).toContainHTML(`<div>GameFinish</div>`);

    expect(container).not.toContainHTML('Chargement en cours...');
    expect(container).not.toContainHTML(`<div>PlayerEnterName</div>`);
    expect(container).not.toContainHTML(`<div>QuestionHeader</div>`);
    expect(container).not.toContainHTML(`<div>PlayerEnterChoice</div>`);
    expect(container).not.toContainHTML(`Tenez-vous prêt.e !`);
    expect(container).not.toContainHTML(`Statut non géré`);
    expect(container).not.toContainHTML(
      "Nous n'avons pas trouvé le jeu avec l'ID ",
    );
    expect(container).not.toContainHTML(
      `Nous avons trouvé plusieurs jeux avec ce l'ID `,
    );
  });
});
