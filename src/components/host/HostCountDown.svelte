<script>
  import { onDestroy, getContext } from 'svelte';
  import HostEndStep from './HostEndStep.svelte';

  export let gameRef;
  export let numberOfSeconds = 5;
  export let nextState = 'question';
  export let endStepLabel = 'Passer !';

  const firebase = getContext('firebase').getFirebase();

  const changeState = () => {
    gameRef.update({ state: nextState });
  };

  let count = 0;
  let remaining = numberOfSeconds - count;
  $: timerText = `Timer : ${remaining} sec.`;

  const increment = () => {
    if (remaining > 1) {
      count++;
      remaining = numberOfSeconds - count;
    } else {
      clearInterval(interval);
      changeState();
    }
  };

  const interval = setInterval(increment, 1000);

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<p class="text-center">
  {timerText}
  <HostEndStep {gameRef} {nextState} label={endStepLabel} />
</p>
