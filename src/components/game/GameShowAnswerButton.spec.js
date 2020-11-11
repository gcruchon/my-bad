import { render, fireEvent } from '@testing-library/svelte';
import GameShowAnswerButton from './GameShowAnswerButton.svelte';

const gameRef = {
  update: jest.fn(),
};

describe('GameShowAnswerButton', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should change game state to showAnswer', async () => {
    const { getByText } = render(GameShowAnswerButton, {
      props: {
        gameRef,
      },
    });
    const linkShowAnswer = getByText(/Voir la réponse !/i);
    expect(linkShowAnswer).toBeInTheDocument();
    expect(linkShowAnswer).toBeInstanceOf(HTMLButtonElement);
    await fireEvent.click(linkShowAnswer);
    expect(gameRef.update).toHaveBeenCalledTimes(1);
    const call = gameRef.update.mock.calls[0][0];
    expect(call.state).toEqual('showAnswer');
  });
});
