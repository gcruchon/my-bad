<script>
  export let path;
  export let query = null;
  export let traceId = "";
  export let log = false;
  export let startWith = undefined;
  export let maxWait = 10000;
  export let once = false;
</script>

<div>MockCollectionEnterNameEmpty</div>
<slot name="before" />

<slot data={[]} ref={{}} error={null} first={null} last={null} />
{#if false}
  <slot name="loading" />
{:else if false}
  <slot name="fallback" />
{/if}
<slot name="after" />
