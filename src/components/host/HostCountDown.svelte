<script>
  import { onDestroy } from "svelte";
  import HostEndStep from "../host/HostEndStep.svelte";

  export let gameRef;
  export let numberOfSeconds = 5;
  export let nextState = "question";
  export let endStepLabel = "Passer !";

  let count = 0;
  $: remaining = numberOfSeconds - count;

  const increment = () => {
    if (remaining > 0) {
      count++;
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
  Timer :
  {remaining}
  sec.
  <HostEndStep {gameRef} {nextState} label={endStepLabel} />
</p>
