const svelte = jest.createMockFromModule('svelte');

const add = jest.fn();
const auth = jest.fn().mockImplementation(() => {
  return { currentUser: null };
});

svelte.__addMock__ = add;
svelte.__authMock__ = auth;
svelte.getContext = () => {
  return {
    getFirebase: () => {
      return {
        firestore: () => {
          return {
            collection: () => {
              return { add };
            },
          };
        },
        auth,
      };
    },
  };
};

module.exports = svelte;
