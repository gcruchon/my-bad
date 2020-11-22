<script>
  export let gameRef;
</script>

<style>
  .next {
    padding: 2em;
    text-align: center;
  }
</style>

<p class="next">
  <button
    class="btn btn-primary"
    on:click={() => gameRef.update({ state: 'showAnswer' })}>
    Voir la réponse !
  </button>
</p>
