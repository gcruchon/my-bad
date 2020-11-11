<script>
  export let path;
  export let log = false;
  export let traceId = "";
  export let startWith = undefined;
  export let maxWait = 10000;
  export let once = false;
  const game = {
    id: '1234567890AZERTYUI',
    shortId: 'ABCDEF',
    state: 'waitingForPlayers',
    questionIndex: 0,
    questions: [1, 2, 3],
    createdAt: Date.now()
  };
</script>

<div>Mock DocGameNotStarted</div>
<slot name="before" />

<slot data={game} ref={{}} error={{}} />
{#if false}
  <slot name="loading" />
{:else if false}
  <slot name="fallback" />
{/if}
<slot name="after" />
