import { asyncForEach } from "../../utils";

export const getAnswers = async (db, gameId, questionId) => {
  let results = {
    errors: [],
    mistakes: [],
    failures: [],
  };

  const playerSnapshot = await db.collection(`games/${gameId}/players`).get();

  await asyncForEach(playerSnapshot, async (player) => {
    const playerData = player.data();
    const answerSnapshot = await player.ref
      .collection("answers")
      .where("questionId", "==", questionId)
      .get();

    answerSnapshot.forEach((answer) => {
      const answerValue = answer.data().value;

      switch (answerValue) {
        case "error":
          results.errors.push(playerData);
          break;
        case "mistake":
          results.mistakes.push(playerData);
          break;
        case "failure":
          results.failures.push(playerData);
          break;
      }
    });
  });
  return results;
};


export const showPlayers = (players) => {
  if(players.length) {
    let listOfPlayers = '';
    players.forEach((player, index) => {
      if(index) {
        listOfPlayers += ', ';
      }
      listOfPlayers += player.name;
    });
    return listOfPlayers;
  } else {
    return '--';
  }
};
