import { render, fireEvent } from '@testing-library/svelte';

import MockCollectionGamesLoading from './__mocks__/MockCollectionGamesLoading.svelte';
import MockCollectionGamesEmpty from './__mocks__/MockCollectionGamesEmpty.svelte';
import MockCollectionTwoGames from './__mocks__/MockCollectionTwoGames.svelte';
import MockCollectionThreeGames from './__mocks__/MockCollectionThreeGames.svelte';

jest.mock('../game/GameStatus.svelte');
jest.mock('./HostStartGame.svelte');


describe('HostHome', () => {
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
  it('should handle loading games', async () => {
    setupMockModules(MockCollectionGamesLoading);
    await import('sveltefire');
    let HostHome = await import('./HostHome.svelte');
    const { container } = render(HostHome, {
      props: {
        userId: 'my-long-useirId',
      },
    });

    expect(container).toContainHTML('Liste des jeux en cours');
    expect(container).toContainHTML('Liste des jeux terminés');
    expect(container).toContainHTML('Chargement des jeux...');

    expect(container).not.toContainHTML('Aucun jeu terminé.');
    expect(container).not.toContainHTML('<div>HostStartGame</div>');
    expect(container).not.toContainHTML('Aucun jeu en cours.');
    expect(container).not.toContainHTML('<div>GameStatus</div>');
  });
  it('should handle empty game lists', async () => {
    setupMockModules(MockCollectionGamesEmpty);
    await import('sveltefire');
    let HostHome = await import('./HostHome.svelte');
    const { container } = render(HostHome, {
      props: {
        userId: 'my-long-useirId',
      },
    });

    expect(container).toContainHTML('Liste des jeux en cours');
    expect(container).toContainHTML('Aucun jeu en cours.');
    expect(container).toContainHTML('<div>HostStartGame</div>');
    expect(container).toContainHTML('Liste des jeux terminés');
    expect(container).toContainHTML('Aucun jeu terminé.');

    expect(container).not.toContainHTML('Chargement des jeux...');
    expect(container).not.toContainHTML('<div>GameStatus</div>');
  });
  it('should handle with 2 games in the lists', async () => {
    setupMockModules(MockCollectionTwoGames);
    await import('sveltefire');
    let { navigate } = await import('svelte-routing');
    let HostHome = await import('./HostHome.svelte');
    const { getAllByText, container } = render(HostHome, {
      props: {
        userId: 'my-long-useirId',
      },
    });

    expect(container).toContainHTML('Liste des jeux en cours');
    expect(container).toContainHTML('<div>GameStatus|INPRGR01|waitingForPlayers|0</div>');
    expect(container).toContainHTML('<div>GameStatus|INPRGR02|question|2</div>');
    expect(container).toContainHTML('<div>HostStartGame</div>');

    const buttons = getAllByText('Jouer !');
    expect(buttons).toHaveLength(2);
    const buttonGame1 = buttons[0];
    await fireEvent.click(buttonGame1);
    expect(navigate).toHaveBeenLastCalledWith('/host/longIdForInProgress01');
    const buttonGame2 = buttons[1];
    await fireEvent.click(buttonGame2);
    expect(navigate).toHaveBeenLastCalledWith('/host/longIdForInProgress02');

    expect(container).toContainHTML('Liste des jeux terminés');
    expect(container).toContainHTML('FINISH01');
    expect(container).toContainHTML('FINISH02');

    expect(container).not.toContainHTML('Aucun jeu en cours.');
    expect(container).not.toContainHTML('Aucun jeu terminé.');
    expect(container).not.toContainHTML('Chargement des jeux...');
    expect(container).not.toContainHTML('<div>GameStatus</div>');
  });
  it('should not show a create new game button with 3 games in progress', async () => {
    setupMockModules(MockCollectionThreeGames);
    await import('sveltefire');
    let HostHome = await import('./HostHome.svelte');
    const { container } = render(HostHome, {
      props: {
        userId: 'my-long-useirId',
      },
    });

    expect(container).toContainHTML('Liste des jeux en cours');
    expect(container).toContainHTML('<div>GameStatus|INPRGR01|waitingForPlayers|0</div>');
    expect(container).toContainHTML('<div>GameStatus|INPRGR02|question|2</div>');
    expect(container).toContainHTML('<div>GameStatus|INPRGR03|showResults|3</div>');

    expect(container).toContainHTML('Liste des jeux terminés');
    expect(container).toContainHTML('FINISH01');
    expect(container).toContainHTML('FINISH02');
    expect(container).toContainHTML('FINISH03');

    expect(container).not.toContainHTML('<div>HostStartGame</div>');
    expect(container).not.toContainHTML('Aucun jeu en cours.');
    expect(container).not.toContainHTML('Aucun jeu terminé.');
    expect(container).not.toContainHTML('Chargement des jeux...');
    expect(container).not.toContainHTML('<div>GameStatus</div>');
  });
});
