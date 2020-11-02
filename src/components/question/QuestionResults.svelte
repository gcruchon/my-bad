<script>
  import { getContext } from "svelte";
  import { asyncForEach } from "../../utils";

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

<style>
    h4 {
      font-size: 120%;
      margin-bottom: 0;
    }
    ul {
      margin-top: 0.5em;
    }
</style>

{#await promise}
  <p>Chargement de réponses en cours...</p>
{:then results}
  <h4>Liste des résultats</h4>
  <ul>
    <li>Nombre de réponses <span class="error">"erreur" : {results.errors.length}</span></li>
    <li>Nombre de réponses <span class="mistake">"faute" : {results.mistakes.length}</span></li>
    <li>Nombre de réponses <span class="failure">"échec" : {results.failures.length}</span></li>
  </ul>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
