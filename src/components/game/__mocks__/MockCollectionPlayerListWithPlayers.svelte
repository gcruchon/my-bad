<script>
  export let path;
  export let query = null;
  export let traceId = '';
  export let log = false;
  export let startWith = undefined;
  export let maxWait = 10000;
  export let once = false;

  const players = [
    { name: 'Player One', ref: { delete: jest.fn() } },
    { name: 'Player Two', ref: { delete: jest.fn() } },
  ];
</script>

<div>MockCollectionPlayerListWithPlayers</div>
<slot name="before" />

<slot data={players} ref={{}} error={null} first={null} last={null} />
{#if false}
  <slot name="loading" />
{:else if false}
  <slot name="fallback" />
{/if}
<slot name="after" />
