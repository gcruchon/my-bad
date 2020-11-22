<script>
  export let gameRef;
  export let nextState = 'preQuestion';
  export let label = 'Passer !';
</script>

<button
  class="btn btn-outline-secondary"
  on:click={() => gameRef.update({ state: nextState })}>
  {label}
</button>
