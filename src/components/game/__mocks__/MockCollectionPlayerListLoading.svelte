<script>
  export let path;
  export let query = null;
  export let traceId = '';
  export let log = false;
  export let startWith = undefined;
  export let maxWait = 10000;
  export let once = false;
</script>

<div>MockCollectionPlayerListLoading</div>
<slot name="before" />

<slot name="loading" />
{#if false}
  <slot data={null} ref={null} error={null} first={null} last={null} />
{:else if false}
  <slot name="fallback" />
{/if}
<slot name="after" />
