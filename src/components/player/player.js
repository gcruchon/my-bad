export const saveAnswer = (answersRef, questionId, value) =>
  answersRef.add({
    questionId: questionId,
    value: value,
    createdAt: Date.now(),
  });
