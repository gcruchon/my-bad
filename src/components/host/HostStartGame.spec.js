import { render, fireEvent } from '@testing-library/svelte';
import HostStartGame from './HostStartGame.svelte';
import { __addMock__ } from 'svelte';
jest.mock('svelte');

const userId = 'long-user-id';
jest.mock('nanoid/non-secure', () => {
  const mockedFunctions = {
    customAlphabet: () => () => 'ABCDEF12',
  };
  return {
    __esModule: true,
    default: mockedFunctions,
    ...mockedFunctions,
  };
});
jest.mock('../../utils', () => {
  const mockedFunctions = {
    getRandomQuestions: () => [1, 2, 3, 4, 5, 6],
  };
  return {
    __esModule: true,
    default: mockedFunctions,
    ...mockedFunctions,
  };
});

describe('HostStartGame', () => {
  it('should have a button to start the game', async () => {
    const { getByText } = render(HostStartGame, { props: { userId } });

    const buttonStart = getByText(/Initier un jeu !/i);
    expect(buttonStart).toBeInTheDocument();
    expect(buttonStart).toBeInstanceOf(HTMLButtonElement);
    await fireEvent.click(buttonStart);
    expect(__addMock__).toHaveBeenCalledTimes(1);
    const call = __addMock__.mock.calls[0][0];
    expect(call.creatorId).toEqual(userId);
    expect(call.shortId).toEqual('ABCDEF12');
    expect(call.state).toEqual('waitingForPlayers');
    expect(call.currentQuestionIndex).toEqual(0);
    expect(call.creatorId).toEqual(userId);
    expect(call.questions).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
