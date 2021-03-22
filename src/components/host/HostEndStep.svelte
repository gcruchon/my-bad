<script>
  import { getContext } from 'svelte';

  export let gameRef;
  export let nextState = 'preQuestion';
  export let label = 'Passer !';

  const firebase = getContext('firebase').getFirebase();

  const changeState = () => {
    gameRef.update({ state: nextState });
  };
</script>

<button class="btn btn-outline-secondary" on:click={changeState}>
  {label}
</button>
