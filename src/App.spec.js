import { render } from '@testing-library/svelte';
import MockFirebaseApp from './__mocks__/MockFirebaseApp.svelte';
import MockUser from './__mocks__/MockUser.svelte';
import MockUserNotLoggedIn from './__mocks__/MockUserNotLoggedIn.svelte';

jest.mock('firebase/app', () => {
  return {
    default: {
      initializeApp: () => {},
    },
  };
});
jest.mock('./components/user/ShowUser.svelte');
jest.mock('./components/user/SignIn.svelte');
jest.mock('./Routes.svelte');

const firebaseConfigMock = {
  projectId: 'my-bad-game',
};

describe('App', () => {
  const setupMockModules = (user, firebaseConfig) => {
    jest.resetModules();
    const mockedFunctions = {
      FirebaseApp: MockFirebaseApp,
      User: user,
    };
    jest.doMock('sveltefire', () => {
      return {
        __esModule: true,
        default: mockedFunctions,
        ...mockedFunctions,
      };
    });
    jest.doMock(
      './config/firebaseConfig',
      () => {
        return {
          __esModule: true,
          default: firebaseConfig,
        };
      },
      { virtual: true },
    );
  };

  it('should render component when not logged in', async () => {
    setupMockModules(MockUserNotLoggedIn, firebaseConfigMock);
    await import('sveltefire');
    await import('./config/firebaseConfig');
    let App = await import('./App.svelte');

    const { container } = render(App);
    expect(container).toContainHTML('My bad! 😅');
    expect(container).toContainHTML('<div>SignIn</div>');

    expect(container).not.toContainHTML('Please check your config...');
    expect(container).not.toContainHTML('<div>ShowUser</div>');
    expect(container).not.toContainHTML('<div>Routes</div>');
  });
  it('should render component when logged in', async () => {
    setupMockModules(MockUser, firebaseConfigMock);
    await import('sveltefire');
    await import('./config/firebaseConfig');
    let App = await import('./App.svelte');
    const { container } = render(App);

    expect(container).toContainHTML('My bad! 😅');
    expect(container).toContainHTML('<div>ShowUser</div>');
    expect(container).toContainHTML('<div>Routes</div>');

    expect(container).not.toContainHTML('Please check your config...');
    expect(container).not.toContainHTML('<div>SignIn</div>');
  });
  it('should fail when firebase config is not good', async () => {
    setupMockModules(MockUser, {});
    await import('sveltefire');
    await import('./config/firebaseConfig');
    let App = await import('./App.svelte');
    const { container } = render(App);

    expect(container).toContainHTML('Please check your config...');
  });
});
