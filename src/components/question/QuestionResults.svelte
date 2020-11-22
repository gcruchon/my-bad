<script>
  import { getContext } from 'svelte';
  import { getAnswers, showPlayers } from './question';

  export let gameId;
  export let game;
  const questionId = game.questions[game.currentQuestionIndex];

  const app = getContext('firebase').getFirebase();
  const db = app.firestore();
  let promise = getAnswers(db, gameId, questionId);
</script>

{#await promise}
  <p class="text-center">Chargement de réponses en cours...</p>
{:then results}
  <p class="h4 mt-4">Liste des résultats</p>
  <ul>
    <li>
      Réponses
      <span class="error">"erreur" : {showPlayers(results.errors)}</span>
    </li>
    <li>
      Réponses
      <span class="mistake">"faute" : {showPlayers(results.mistakes)}</span>
    </li>
    <li>
      Réponses
      <span class="failure">"échec" : {showPlayers(results.failures)}</span>
    </li>
  </ul>
{:catch error}
  <p class="alert alert-danger" role="alert">{error.message}</p>
{/await}
