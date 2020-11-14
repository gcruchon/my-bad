<script>
  import { onDestroy } from 'svelte';
  import HostEndStep from './HostEndStep.svelte';

  export let gameRef;
  export let numberOfSeconds = 5;
  export let nextState = 'question';
  export let endStepLabel = 'Passer !';

  let count = 0;
  let remaining = numberOfSeconds - count;
  $: timerText = `Timer : ${remaining} sec.`;

  const increment = () => {
    if (remaining > 1) {
      count++;
      remaining = numberOfSeconds - count;
    } else {
      clearInterval(interval);
      gameRef.update({
        state: nextState,
      });
    }
  };

  const interval = setInterval(increment, 1000);

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<style>
  p {
    text-align: center;
  }
</style>

<p>
  {timerText}
  <HostEndStep {gameRef} {nextState} label={endStepLabel} />
</p>
