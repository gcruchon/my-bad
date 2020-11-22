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
    const mockGetCurrentBaseURL = jest.fn().mockImplementation(() => {
      return 'http://localhost';
    });
    jest.doMock('../../utils', () => {
      return {
        __esModule: true,
        default: { getCurrentBaseURL: mockGetCurrentBaseURL },
        getCurrentBaseURL: mockGetCurrentBaseURL,
      };
    });
  };
  it('indicate the game ID', async () => {
    setupMockModules();
    await import('svelte-routing');
    const GameHeader = await import('./GameHeader.svelte');
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

    expect(container).not.toContainHTML('Lien à partager :');
    expect(container).not.toContainHTML(
      `Jeu commencé le ${new Date(createdAt).toLocaleString()}`,
    );
  });
  it('can provide a link if asked to', async () => {
    setupMockModules();
    await import('svelte-routing');
    const GameHeader = await import('./GameHeader.svelte');
    const { getByText, container } = render(GameHeader, {
      props: {
        shortId: 'ABCDEFG',
        withLink: true,
        createdAt,
      },
    });

    expect(container).toContainHTML('Lien à partager :');
    const link = getByText('http://localhost/player/ABCDEFG');
    expect(link).toBeInTheDocument();
    expect(link).toBeInstanceOf(HTMLAnchorElement);
    expect(link.href).toEqual('http://localhost/player/ABCDEFG');
  });
  it('can indicate when it started if asked to', async () => {
    setupMockModules();
    await import('svelte-routing');
    const GameHeader = await import('./GameHeader.svelte');
    const { container } = render(GameHeader, {
      props: {
        shortId: 'ABCDEFG',
        withDateCreated: true,
        createdAt,
      },
    });
    expect(container).toContainHTML('ID du jeu :');
    expect(container).toContainHTML(
      `Jeu commencé le ${new Date(createdAt).toLocaleString()}`,
    );

    expect(container).not.toContainHTML('Lien à partager :');
  });
});
