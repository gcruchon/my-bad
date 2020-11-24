<script>
  import { getContext } from 'svelte';
  import {
    EVENT_HOST_FINISH_GAME,
    EVENT_HOST_GO_TO_NEXT_QUESTION,
    logEvent,
  } from '../../analytics';

  export let game;
  export let gameRef;

  const nextQuestionIndex = game.currentQuestionIndex + 1;
  const isLastQuestion = nextQuestionIndex >= game.questions.length;

  const firebase = getContext('firebase').getFirebase();

  const finishGame = () => {
    logEvent(firebase, EVENT_HOST_FINISH_GAME);
    gameRef.update({
      state: 'finished',
      finishedAt: Date.now(),
    });
  };

  const goToNextQuestion = () => {
    logEvent(firebase, EVENT_HOST_GO_TO_NEXT_QUESTION);
    gameRef.update({
      state: 'preQuestion',
      currentQuestionIndex: nextQuestionIndex,
    });
  };
</script>

{#if isLastQuestion}
  <p class="text-center mt-4 pb-5">
    <button on:click={finishGame}> Terminer le jeu ! </button>
  </p>
{:else}
  <p class="text-center mt-4">
    <button class="btn btn-primary" on:click={goToNextQuestion}>
      Prochaine question !
    </button>
  </p>
  <p class="text-center pb-5">
    <a href={'#'} on:click={finishGame}> Terminer le jeu ! </a>
  </p>
{/if}
