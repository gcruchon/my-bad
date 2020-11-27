<script>
  import { getContext } from 'svelte';
  import { EVENT_HOST_SHOW_ANSWER, logEvent } from '../../analytics';
  export let gameRef;

  const firebase = getContext('firebase').getFirebase();

  const showAnswer = () => {
    logEvent(firebase, EVENT_HOST_SHOW_ANSWER);
    gameRef.update({ state: 'showAnswer' });
  };
</script>

<style>
  .next {
    padding: 2em;
    text-align: center;
  }
</style>

<p class="next">
  <button class="btn btn-primary" on:click={showAnswer}>
    Voir la réponse !
  </button>
</p>
