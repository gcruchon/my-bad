<script>
  export let path;
  export let query = null;
  export let traceId = '';
  export let log = false;
  export let startWith = undefined;
  export let maxWait = 10000;
  export let once = false;
</script>

<div>MockCollectionHomeLoading</div>
<slot name="before" />

<slot name="loading" />
{#if false}
  <slot data={{}} ref={{}} error={null} first={null} last={null} />
{:else if false}
  <slot name="fallback" />
{/if}
<slot name="after" />
