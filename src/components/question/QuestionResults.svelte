<script>
  import { getContext } from 'svelte';
  import { getAnswers } from './question';

  export let gameId;
  export let game;
  const questionId = game.questions[game.currentQuestionIndex];

  const app = getContext('firebase').getFirebase();
  const db = app.firestore();
  let promise = getAnswers(db, gameId, questionId);
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
    <li>
      Nombre de réponses
      <span class="error">"erreur" : {results.errors.length}</span>
    </li>
    <li>
      Nombre de réponses
      <span class="mistake">"faute" : {results.mistakes.length}</span>
    </li>
    <li>
      Nombre de réponses
      <span class="failure">"échec" : {results.failures.length}</span>
    </li>
  </ul>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
