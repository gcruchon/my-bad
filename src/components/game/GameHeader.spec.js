import { render } from '@testing-library/svelte';
import MockLink from './__mocks__/MockLink.svelte';

const createdAt = Date.now();

describe('GameHeader', () => {
  const setupMockModules = () => {
    jest.resetModules();
    const mockedFunctions = {
      Link: MockLink,
    };
    jest.doMock('svelte-routing', () => {
      return {
        __esModule: true,
        default: mockedFunctions,
        ...mockedFunctions,
      };
    });
  };
  it('indicate the game ID, provide a link and indicate when it started', async () => {
    setupMockModules();
    return import('svelte-routing').then(svelteRouting => {
      return import('./GameHeader.svelte').then(GameHeader => {
        const { getByText, container } = render(GameHeader, {
          props: {
            shortId: 'ABCDEFG',
            createdAt,
          },
        });
        expect(container).toContainHTML('ID du jeu :');
        const gameIdSpan = getByText('ABCDEFG');
        expect(gameIdSpan).toBeInTheDocument();
        expect(gameIdSpan).toBeInstanceOf(HTMLSpanElement);

        expect(container).toContainHTML('Lien à partager :');
        const link = getByText('https://my-bad-game.web.app/player/ABCDEFG');
        expect(link).toBeInTheDocument();
        expect(link).toBeInstanceOf(HTMLAnchorElement);
        expect(link.href).toEqual('http://localhost/player/ABCDEFG');

        expect(container).toContainHTML(`Jeu commencé le ${new Date(createdAt).toLocaleString()}`);
      });
    });
  });
});
