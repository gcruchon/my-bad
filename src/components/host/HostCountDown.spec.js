import { render, fireEvent } from '@testing-library/svelte';
import HostCountDown from './HostCountDown.svelte';

jest.mock('./HostEndStep.svelte');

const gameRef = {
  update: jest.fn(),
};

const timerHtml = sec => `Timer : ${sec} sec.`;

describe('HostCountDown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    gameRef.update.mockClear();
  });
  it('should count down (Captain Obvious !)', async () => {
    const { container } = render(HostCountDown, {
      props: {
        gameRef,
        numberOfSeconds: 3
      },
    });
    expect(container).toContainHTML(timerHtml(3));
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    jest.advanceTimersByTime(6000);
    expect(clearInterval).toHaveBeenCalledTimes(1);
    expect(gameRef.update).toHaveBeenCalledTimes(1);
    const call = gameRef.update.mock.calls[0][0];
    expect(call.state).toEqual('question');
  });
  it('should personalize status', async () => {
    const { container } = render(HostCountDown, {
      props: {
        gameRef,
        numberOfSeconds: 3,
        nextState: 'nextState'
      },
    });
    expect(container).toContainHTML(timerHtml(3));
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    jest.advanceTimersByTime(6000);
    expect(clearInterval).toHaveBeenCalledTimes(1);
    expect(gameRef.update).toHaveBeenCalledTimes(1);
    const call = gameRef.update.mock.calls[0][0];
    expect(call.state).toEqual('nextState');
  });
});
