export const getNumberOfQuestions = jest.fn().mockImplementation(() => {
  return new Promise((resolve, reject) => {
    resolve(6);
  });
});
