import { asyncForEach } from "../../utils";

export const getAnswers = async (db, gameId, questionId) => {
  let results = {
    errors: [],
    mistakes: [],
    failures: [],
  };

  const playerSnapshot = await db.collection(`games/${gameId}/players`).get();

  await asyncForEach(playerSnapshot, async (player) => {
    const playerId = player.data().userId;
    const answerSnapshot = await player.ref
      .collection("answers")
      .where("questionId", "==", questionId)
      .get();

    answerSnapshot.forEach((answer) => {
      const answerValue = answer.data().value;

      switch (answerValue) {
        case "error":
          results.errors.push(playerId);
          break;
        case "mistake":
          results.mistakes.push(playerId);
          break;
        case "failure":
          results.failures.push(playerId);
          break;
      }
    });
  });
  return results;
};
