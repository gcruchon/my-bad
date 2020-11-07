import { render } from '@testing-library/svelte';
import Footer from './Footer.svelte';

jest.mock(
  './shared',
  () => ({
    getAppVersion: () => {
      return '1.0.0';
    },
  }),
  { virtual: true },
);

describe('Footer', () => {
  it('should render component', async () => {
    const { container } = render(Footer);
    expect(container).toContainHTML('version 1.0.0');
  });
});
