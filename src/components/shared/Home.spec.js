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

    const title = getByText('Vous souhaitez ...');
    expect(title).toBeInTheDocument();
    expect(title).toBeInstanceOf(HTMLParagraphElement);
  });
  it('should have a host button', async () => {
    const { getByText } = render(Home);

    const buttonHost = getByText(/Animer un jeu/i);
    expect(buttonHost).toBeInTheDocument();
    expect(buttonHost).toBeInstanceOf(HTMLButtonElement);
    await fireEvent.click(buttonHost);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/host');
  });
  it('should have a player button', async () => {
    const { getByText } = render(Home);

    const buttonPlayer = getByText(/Rejoindre un jeu existant/i);
    expect(buttonPlayer).toBeInTheDocument();
    expect(buttonPlayer).toBeInstanceOf(HTMLButtonElement);
    await fireEvent.click(buttonPlayer);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/player');
  });
});
