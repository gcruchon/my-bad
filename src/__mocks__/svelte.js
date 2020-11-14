const svelte = jest.createMockFromModule('svelte');

const add = jest.fn();

svelte.__addMock__ = add;
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
      };
    },
  };
};

module.exports = svelte;
