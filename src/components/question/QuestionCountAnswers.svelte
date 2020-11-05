<script>
  import { Collection } from "sveltefire";
  export let game;
  export let gameRef;

  const questionId = game.questions[game.currentQuestionIndex];
  $: countAnswers = 0;
</script>

<style>
  p {
    font-size: 80%;
  }
  span {
    background-color: #eee;
    padding: 0.4em;
    color: #444;
    font-style: italic;
  }
</style>

<p>
  Réponses reçues :
  <Collection path={gameRef.collection('players')} let:data={players} log>
    {#each players as player}
      <Collection
        path={player.ref.collection('answers')}
        query={(ref) => ref.where('questionId', '==', questionId)}
        let:data={answers}
        log>
        {#if answers.length}<span>{player.name}</span>{/if}
        <span slot="loading">Chargement...</span>
      </Collection>
    {/each}
    <span slot="loading">Chargement...</span>
  </Collection>
</p>
