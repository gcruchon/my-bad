<script>
  export let path;
  export let query = null;
  export let traceId = '';
  export let log = false;
  export let startWith = undefined;
  export let maxWait = 10000;
  export let once = false;

  const isFinished = query.toString().includes('"==", "finished"');
  const games = isFinished ? [
    {
      shortId: 'FINISH01',
      createdAt: new Date(2020, 3, 3, 21, 0, 0),
      finishedAt: new Date(2020, 3, 3, 22, 0, 0),
    },
    {
      shortId: 'FINISH02',
      createdAt: new Date(2020, 2, 14, 21, 0, 0),
      finishedAt: new Date(2020, 2, 14, 22, 0, 0),
    },
    {
      shortId: 'FINISH03',
      createdAt: new Date(2020, 1, 15, 21, 0, 0),
      finishedAt: new Date(2020, 1, 15, 22, 0, 0),
    },
  ] : [
    {
      id: 'longIdForInProgress01',
      shortId: 'INPRGR01',
      state: 'waitingForPlayers',
      currentQuestionIndex: 0,
      question: [1, 2, 3, 4],
      createdAt: new Date(2020, 6, 14, 12, 0, 0),
    },
    {
      id: 'longIdForInProgress02',
      shortId: 'INPRGR02',
      state: 'question',
      currentQuestionIndex: 2,
      question: [1, 2, 3, 4],
      createdAt: new Date(2020, 7, 15, 9, 0, 0),
    },
    {
      id: 'longIdForInProgress03',
      shortId: 'INPRGR03',
      state: 'showResults',
      currentQuestionIndex: 3,
      question: [1, 2, 3, 4],
      createdAt: new Date(2020, 10, 11, 7, 0, 0),
    },
  ];
</script>

<div>MockCollectionThreeGames</div>
<slot name="before" />

<slot data={games} ref={{}} error={null} first={null} last={null} />
{#if false}
  <slot name="loading" />
{:else if false}
  <slot name="fallback" />
{/if}
<slot name="after" />
