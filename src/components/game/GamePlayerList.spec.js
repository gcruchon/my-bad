import { render, fireEvent } from '@testing-library/svelte';

import MockCollectionPlayerListEmpty from './__mocks__/MockCollectionPlayerListEmpty.svelte';
import MockCollectionPlayerListLoading from './__mocks__/MockCollectionPlayerListLoading.svelte';
import MockCollectionPlayerListWithPlayers from './__mocks__/MockCollectionPlayerListWithPlayers.svelte';

const gameRef = {
  update: jest.fn(),
  collection: jest.fn()
}

describe('GamePlayerList', () => {
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
  };
  afterEach(() => {
    gameRef.update.mockReset();
    gameRef.collection.mockReset();
  });
  it('should handle when players list is loading', async () => {
    setupMockModules(MockCollectionPlayerListLoading);
    await import('sveltefire');
    let GamePlayerList = await import('./GamePlayerList.svelte');
    const { container } = render(GamePlayerList, {
      props: {
        gameRef,
      },
    });

    expect(container).toContainHTML('Liste des joueurs inscrits');
    expect(container).toContainHTML('Chargement des joueurs...');

    expect(container).not.toContainHTML('En attente des joueurs...');

  });
  it('should handle when nobody has registered to the game', async () => {
    setupMockModules(MockCollectionPlayerListEmpty);
    await import('sveltefire');
    let GamePlayerList = await import('./GamePlayerList.svelte');
    const { container } = render(GamePlayerList, {
      props: {
        gameRef,
      },
    });

    expect(container).toContainHTML('Liste des joueurs inscrits');
    expect(container).toContainHTML('En attente des joueurs...');

    expect(container).not.toContainHTML('Chargement des joueurs...');
  });
  it('should handle when two players registered to the game', async () => {
    setupMockModules(MockCollectionPlayerListWithPlayers);
    await import('sveltefire');
    let GamePlayerList = await import('./GamePlayerList.svelte');
    const { getByText, container } = render(GamePlayerList, {
      props: {
        gameRef,
      },
    });

    expect(container).toContainHTML('Liste des joueurs inscrits');
    expect(container).toContainHTML('Player One');
    expect(container).toContainHTML('Player Two');

    const buttonStart = getByText(/Commencer la partie !/i);
    expect(buttonStart).toBeInTheDocument();
    expect(buttonStart).toBeInstanceOf(HTMLButtonElement);
    await fireEvent.click(buttonStart);
    expect(gameRef.update).toHaveBeenCalledTimes(1);
    expect(gameRef.update).toHaveBeenCalledWith({ state: 'preQuestion' });

    expect(container).not.toContainHTML('En attente des joueurs...');
    expect(container).not.toContainHTML('Chargement des joueurs...');
  });
});
