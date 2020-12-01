import { render } from '@testing-library/svelte';
import Footer from './Footer.svelte';

jest.mock('./shared');

describe('Footer', () => {
  it('should render component', async () => {
    const { container } = render(Footer);
    expect(container).toContainHTML('version 1.2.3-test');
  });
});
