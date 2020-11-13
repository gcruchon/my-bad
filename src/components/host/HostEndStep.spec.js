import { render, fireEvent } from '@testing-library/svelte';
import HostEndStep from './HostEndStep.svelte';

const gameRef = {
  update: jest.fn(),
};

describe('HostEndStep', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should propose to finish the game', async () => {
    const { getByText } = render(HostEndStep, {
      props: {
        gameRef,
        label: 'labelForButton',
        nextState: 'nextState'
      },
    });
    const button = getByText('labelForButton');
    expect(button).toBeInTheDocument();
    expect(button).toBeInstanceOf(HTMLButtonElement);
    await fireEvent.click(button);
    expect(gameRef.update).toHaveBeenCalledTimes(1);
    const call = gameRef.update.mock.calls[0][0];
    expect(call.state).toEqual('nextState');
  });
});
