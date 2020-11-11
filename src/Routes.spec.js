import { render } from '@testing-library/svelte';
import { navigate } from 'svelte-routing';
import Routes from './Routes.svelte';

jest.mock('./components/game/GameHost.svelte');
jest.mock('./components/player/PlayerHome.svelte');
jest.mock('./components/player/PlayerEnterPin.svelte');
jest.mock('./components/host/HostHome.svelte');
jest.mock('./components/shared/Home.svelte');

describe('Routes', () => {
  it('should manage home page', () => {
    navigate('/');
    const { container } = render(Routes, {
      props: {
        userId: 'dummy',
      }
    });
    expect(container).toContainHTML('<div>Home</div>');

    expect(container).not.toContainHTML('<div>PlayerHome</div>');
    expect(container).not.toContainHTML('<div>PlayerEnterPin</div>');
    expect(container).not.toContainHTML('<div>GameHost</div>');
    expect(container).not.toContainHTML('<div>HostHome</div>');
  });
  it('should manage player game page', () => {
    navigate('/player/111111');
    const { container } = render(Routes, {
      props: {
        userId: 'dummy',
      }
    });
    expect(container).toContainHTML('<div>PlayerHome</div>');

    expect(container).not.toContainHTML('<div>Home</div>');
    expect(container).not.toContainHTML('<div>PlayerEnterPin</div>');
    expect(container).not.toContainHTML('<div>GameHost</div>');
    expect(container).not.toContainHTML('<div>HostHome</div>');
  });
  it('should manage player enter pin page', () => {
    navigate('/player');
    const { container } = render(Routes, {
      props: {
        userId: 'dummy',
      }
    });
    expect(container).toContainHTML('<div>PlayerEnterPin</div>');

    expect(container).not.toContainHTML('<div>Home</div>');
    expect(container).not.toContainHTML('<div>PlayerHome</div>');
    expect(container).not.toContainHTML('<div>GameHost</div>');
    expect(container).not.toContainHTML('<div>HostHome</div>');
  });
  it('should manage host game page', () => {
    navigate('/host/111111');
    const { container } = render(Routes, {
      props: {
        userId: 'dummy',
      }
    });
    expect(container).toContainHTML('<div>GameHost</div>');

    expect(container).not.toContainHTML('<div>Home</div>');
    expect(container).not.toContainHTML('<div>PlayerEnterPin</div>');
    expect(container).not.toContainHTML('<div>PlayerHome</div>');
    expect(container).not.toContainHTML('<div>HostHome</div>');
  });
  it('should manage player enter pin page', () => {
    navigate('/host');
    const { container } = render(Routes, {
      props: {
        userId: 'dummy',
      }
    });
    expect(container).toContainHTML('<div>HostHome</div>');

    expect(container).not.toContainHTML('<div>Home</div>');
    expect(container).not.toContainHTML('<div>PlayerHome</div>');
    expect(container).not.toContainHTML('<div>GameHost</div>');
    expect(container).not.toContainHTML('<div>PlayerEnterPin</div>');
  });
});
