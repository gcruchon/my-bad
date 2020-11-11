import { render, fireEvent } from '@testing-library/svelte';
import GameButtons from './GameButtons.svelte';

const gameRef = {
  update: jest.fn(),
};
const gameFirstQuestion = {
  currentQuestionIndex: 0,
  questions: [1, 2, 3],
};
const gameLastQuestion = {
  currentQuestionIndex: 2,
  questions: [1, 2, 3],
};

describe('GameButtons', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('when not last question', () => {
    it('should propose to finish the game', async () => {
      const { getByText } = render(GameButtons, {
        props: {
          gameRef,
          game: gameFirstQuestion,
        },
      });
      const linkFinish = getByText(/Terminer le jeu !/i);
      expect(linkFinish).toBeInTheDocument();
      expect(linkFinish).toBeInstanceOf(HTMLAnchorElement);
      await fireEvent.click(linkFinish);
      expect(gameRef.update).toHaveBeenCalledTimes(1);
      const call = gameRef.update.mock.calls[0][0];
      expect(call.state).toEqual('finished');
    });
    it('should propose to go to next question', async () => {
      const { getByText } = render(GameButtons, {
        props: {
          gameRef,
          game: gameFirstQuestion,
        },
      });
      const buttonNext = getByText(/Prochaine question !/i);
      expect(buttonNext).toBeInTheDocument();
      expect(buttonNext).toBeInstanceOf(HTMLButtonElement);
      await fireEvent.click(buttonNext);
      expect(gameRef.update).toHaveBeenCalledTimes(1);
      const call = gameRef.update.mock.calls[0][0];
      expect(call.state).toEqual('preQuestion');
      expect(call.currentQuestionIndex).toEqual(1);
    });
  });
  describe('when last question', () => {
    it('should not propose to go to next question', async () => {
      const { container } = render(GameButtons, {
        props: {
          gameRef,
          game: gameLastQuestion,
        },
      });
      expect(container).not.toContainHTML('Prochaine question !');
    });
    it('should propose to finish the game', async () => {
      const { getByText } = render(GameButtons, {
        props: {
          gameRef,
          game: gameLastQuestion,
        },
      });
      const linkFinish = getByText(/Terminer le jeu !/i);
      expect(linkFinish).toBeInTheDocument();
      expect(linkFinish).toBeInstanceOf(HTMLButtonElement);
      await fireEvent.click(linkFinish);
      expect(gameRef.update).toHaveBeenCalledTimes(1);
      const call = gameRef.update.mock.calls[0][0];
      expect(call.state).toEqual('finished');
    });
  });
});
