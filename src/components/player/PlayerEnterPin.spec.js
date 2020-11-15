import { render, fireEvent } from '@testing-library/svelte';
import { navigate } from 'svelte-routing';
import PlayerEnterPin from './PlayerEnterPin.svelte';

jest.mock('svelte-routing');

describe('PlayerEnterPin', () => {
  it('should have a host button', async () => {
    const { getByText } = render(PlayerEnterPin);

    const paragraphEnterPin = getByText("Entrer l'ID du jeu :");
    expect(paragraphEnterPin).toBeInTheDocument();
    expect(paragraphEnterPin).toBeInstanceOf(HTMLParagraphElement);
    expect(paragraphEnterPin.childElementCount).toEqual(1);
    const inputPin = paragraphEnterPin.children[0];
    await fireEvent.input(inputPin, {target: {value: 'TEST1234'}});
    const buttonPlay = getByText('Jouer !');
    await fireEvent.click(buttonPlay);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/player/TEST1234');
  });
});
