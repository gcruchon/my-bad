export const getQuestionSetList = async db => {
  let list = [];

  const questionSetSnapshot = await db.collection(`questionsets`).get();
  questionSetSnapshot.forEach(questionSet => {
    list.push({
      id: questionSet.id,
      name: questionSet.data().name,
      numberOfQuestions: questionSet.data().numberOfQuestions,
    });
  });
  return list;
};
