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
  <button on:click={() => gameRef.update({ state: 'showAnswer' })}>
    Voir la réponse!
  </button>
</p>
