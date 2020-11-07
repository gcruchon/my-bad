import { render } from '@testing-library/svelte';
import Title from './Title.svelte';

describe('Title', () => {
  it('should render component', () => {
    const { container } = render(Title);
    expect(container).toContainHTML('My bad! 😅');
  });
});
