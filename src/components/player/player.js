export const saveAnswer = (answersRef, questionId, value) => {
  answersRef.add({
    questionId: questionId,
    value: value,
    createdAt: Date.now(),
  });
};

export const addPlayer = (playersRef, userId, name) => {
  playersRef.add({
    userId: userId,
    name: name,
    createdAt: Date.now(),
  });
};
