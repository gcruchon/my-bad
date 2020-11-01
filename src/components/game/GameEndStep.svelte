<script>
  export let gameRef;
  export let nextState = "preQuestion";
  export let label = "Passer !";
</script>

<button
  on:click={() => gameRef.update({
    state: nextState,
    })}>
  {label}
</button>
