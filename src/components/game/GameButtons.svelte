<script>
  export let game;
  export let gameRef;

  const nextQuestionIndex = game.currentQuestionIndex + 1;
  const isLastQuestion = nextQuestionIndex >= game.questions.length;
</script>

{#if isLastQuestion}
  <p class="text-center mt-4 pb-5">
    <button
      on:click={() => gameRef.update({
          state: 'finished',
          finishedAt: Date.now(),
        })}>
      Terminer le jeu !
    </button>
  </p>
{:else}
  <p class="text-center mt-4">
    <button
      class="btn btn-primary"
      on:click={() => gameRef.update({
          state: 'preQuestion',
          currentQuestionIndex: nextQuestionIndex,
        })}>
      Prochaine question !
    </button>
  </p>
  <p class="text-center pb-5">
    <a
      href={'#'}
      on:click={() => gameRef.update({
          state: 'finished',
          finishedAt: Date.now(),
        })}>
      Terminer le jeu !
    </a>
  </p>
{/if}
