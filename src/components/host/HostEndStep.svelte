<script>
  import { getContext } from 'svelte';
  import { getEventFromState, logEvent } from '../../analytics';

  export let gameRef;
  export let nextState = 'preQuestion';
  export let label = 'Passer !';

  const firebase = getContext('firebase').getFirebase();

  const changeState = () => {
    logEvent(firebase, getEventFromState(nextState));
    gameRef.update({ state: nextState });
  };
</script>

<button class="btn btn-outline-secondary" on:click={changeState}>
  {label}
</button>
