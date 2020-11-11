<script>
  export let path;
  export let log = false;
  export let traceId = "";
  export let startWith = undefined;
  export let maxWait = 10000;
  export let once = false;
</script>

<div>Mock DocGameLoading</div>
<slot name="before" />

<slot name="loading" />
{#if false}
<slot data={{}} ref={{}} error={{}} />
{:else if false}
  <slot name="fallback" />
{/if}
<slot name="after" />
