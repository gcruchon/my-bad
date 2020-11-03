<script>
  export let game;
  export let gameRef;

  const nextQuestionIndex = game.currentQuestionIndex + 1;
  const isLastQuestion = nextQuestionIndex >= game.questions.length;
</script>

<style>
  .next {
    padding: 2em;
    text-align: center;
  }
</style>

<h4>Leaderboard : TODO</h4>
{#if isLastQuestion}
<p class="next">
  <button
    on:click={() => gameRef.update({
        state: 'finished',
      })}>
    Terminer le jeu!
  </button>
</p>
{:else}
  <p class="next">
    <button
      on:click={() => gameRef.update({
          state: 'preQuestion',
          currentQuestionIndex: nextQuestionIndex,
        })}>
      Prochaine question!
    </button>
  </p>
{/if}
