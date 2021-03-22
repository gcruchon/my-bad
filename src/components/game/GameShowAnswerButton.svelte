<script>
  import { getContext } from 'svelte';
  export let gameRef;

  const firebase = getContext('firebase').getFirebase();

  const showAnswer = () => {
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
