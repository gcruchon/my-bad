<script>
  export let path;
  export let log = false;
  export let traceId = "";
  export let startWith = undefined;
  export let maxWait = 10000;
  export let once = false;
</script>

<div>Mock DocGameNotFound</div>
<slot name="before" />

<slot name="fallback" />
{#if false}
<slot data={{}} ref={{}} error={{}} />
{:else if false}
  <slot name="loading" />
{/if}
<slot name="after" />
