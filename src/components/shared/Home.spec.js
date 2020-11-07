import { render, fireEvent } from '@testing-library/svelte';
import { navigate } from 'svelte-routing';
import Home from './Home.svelte';

jest.mock('svelte-routing');

describe('Home', () => {
  afterEach(() => {
    navigate.mockClear();
  });
  it('should render component', async () => {
    const { getByText } = render(Home);

    const title = getByText('Vous êtes...');
    expect(title).toBeInTheDocument();
    expect(title).toBeInstanceOf(HTMLHeadingElement);
  });
  it('should have a host button', async () => {
    const { getByText } = render(Home);

    const buttonHost = getByText(/Un animateur/i);
    expect(buttonHost).toBeInTheDocument();
    expect(buttonHost).toBeInstanceOf(HTMLButtonElement);
    await fireEvent.click(buttonHost);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/host');
  });
  it('should have a player button', async () => {
    const { getByText } = render(Home);

    const buttonPlayer = getByText(/Un joueur/i);
    expect(buttonPlayer).toBeInTheDocument();
    expect(buttonPlayer).toBeInstanceOf(HTMLButtonElement);
    await fireEvent.click(buttonPlayer);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/player');
  });
});
