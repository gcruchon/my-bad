import { render, fireEvent } from '@testing-library/svelte';

import MockCollectionEnterNameLoading from './__mocks__/MockCollectionEnterNameLoading.svelte';
import MockCollectionEnterNameEmpty from './__mocks__/MockCollectionEnterNameEmpty.svelte';
import MockCollectionEnterNameTwoPlayers from './__mocks__/MockCollectionEnterNameTwoPlayers.svelte';
import MockCollectionEnterNameOnePlayer from './__mocks__/MockCollectionEnterNameOnePlayer.svelte';

const mockAddPlayer = jest.fn();
jest.mock('./player', () => {
  return {
    __esModule: true,
    default: { addPlayer: mockAddPlayer },
    addPlayer: mockAddPlayer,
  };
});

describe('PlayerEnterName', () => {
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
    setupMockModules(MockCollectionEnterNameLoading);
    await import('sveltefire');
    let PlayerEnterName = await import('./PlayerEnterName.svelte');
    const { queryAllByText, container } = render(PlayerEnterName, {
      props: {
        userId: 'my-long-useirId',
        gameId: 'SHORTID1',
      },
    });

    expect(container).toContainHTML('Chargement en cours...');

    expect(container).not.toContainHTML("Le jeu n'a pas encore démarré.");
    expect(container).not.toContainHTML('Entrer votre nom :');
    expect(
      queryAllByText(
        "Nous avons trouvé plusieurs joueurs vous correspondant, c'est embarrassant...",
      ),
    ).toHaveLength(0);
  });
  it('should handle when player is not found', async () => {
    setupMockModules(MockCollectionEnterNameEmpty);
    await import('sveltefire');
    let PlayerEnterName = await import('./PlayerEnterName.svelte');
    const { queryAllByText, getByText, container } = render(PlayerEnterName, {
      props: {
        userId: 'my-long-useirId',
        gameId: 'SHORTID1',
      },
    });

    const paragraphEnterName = getByText('Entrer votre nom :');
    expect(paragraphEnterName).toBeInTheDocument();
    expect(paragraphEnterName).toBeInstanceOf(HTMLParagraphElement);
    expect(paragraphEnterName.childElementCount).toEqual(1);
    const inputName = paragraphEnterName.children[0];
    await fireEvent.input(inputName, {target: {value: 'Great Player'}});
    const buttonPlay = getByText('Jouer !');
    await fireEvent.click(buttonPlay);
    expect(mockAddPlayer).toHaveBeenCalledTimes(1);
    expect(mockAddPlayer.mock.calls[0][1]).toEqual('my-long-useirId');
    expect(mockAddPlayer.mock.calls[0][2]).toEqual('Great Player');

    expect(container).not.toContainHTML("Le jeu n'a pas encore démarré.");
    expect(container).not.toContainHTML('Chargement en cours...');
    expect(
      queryAllByText(
        "Nous avons trouvé plusieurs joueurs vous correspondant, c'est embarrassant...",
      ),
    ).toHaveLength(0);
  });
  it('should handle when several players are not found', async () => {
    setupMockModules(MockCollectionEnterNameTwoPlayers);
    await import('sveltefire');
    let PlayerEnterName = await import('./PlayerEnterName.svelte');
    const { queryAllByText, container } = render(PlayerEnterName, {
      props: {
        userId: 'my-long-useirId',
        gameId: 'SHORTID1',
      },
    });

    expect(
      queryAllByText(
        "Nous avons trouvé plusieurs joueurs vous correspondant, c'est embarrassant...",
      ),
    ).toHaveLength(1);

    expect(container).not.toContainHTML('Entrer votre nom :');
    expect(container).not.toContainHTML('Chargement en cours...');
    expect(container).not.toContainHTML("Le jeu n'a pas encore démarré.");
  });
  it('should handle when player has entered his name', async () => {
    setupMockModules(MockCollectionEnterNameOnePlayer);
    await import('sveltefire');
    let PlayerEnterName = await import('./PlayerEnterName.svelte');
    const { queryAllByText, container } = render(PlayerEnterName, {
      props: {
        userId: 'my-long-useirId',
        gameId: 'SHORTID1',
      },
    });

    expect(container).toContainHTML('Vous êtes inscrit•e, Player One');
    expect(container).toContainHTML("Le jeu n'a pas encore démarré.");
    expect(container).not.toContainHTML('Entrer votre nom :');
    expect(container).not.toContainHTML('Chargement en cours...');
    expect(
      queryAllByText(
        "Nous avons trouvé plusieurs joueurs vous correspondant, c'est embarrassant...",
      ),
    ).toHaveLength(0);
  });
});
