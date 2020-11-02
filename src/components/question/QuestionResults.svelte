<script>
  import { getContext } from "svelte";
  import { asyncForEach } from "../../utils";
  import { Collection } from "sveltefire";

  export let gameId;
  export let game;
  const questionId = game.questions[game.currentQuestionIndex];

  const app = getContext("firebase").getFirebase();
  const db = app.firestore();
  const getAnswers = async () => {
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
  let promise = getAnswers();
</script>

{#await promise}
  <p>Chargement de réponses en cours...</p>
{:then results}
  <p>Nombre de réponses "erreur" : {results.errors.length}</p>
  <p>Nombre de réponses "faute" : {results.mistakes.length}</p>
  <p>Nombre de réponses "échec" : {results.failures.length}</p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}