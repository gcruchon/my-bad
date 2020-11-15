<script>
  export let path;
  export let query = null;
  export let traceId = '';
  export let log = false;
  export let startWith = undefined;
  export let maxWait = 10000;
  export let once = false;

  const isPlayer = query.toString().includes('userId');
  const data = isPlayer
    ? [
        {
          createdAt: new Date(2020, 10, 15, 9, 0, 0),
          name: 'Player One',
          userId: 'PlayerOneLongId',
          ref: {
            collection: () => null,
          },
        },
      ]
    : [
        {
          createdAt: new Date(2020, 10, 15, 9, 3, 0),
          questionId: 1,
          value: 'mistake',
        },
        {
          createdAt: new Date(2020, 10, 15, 9, 3, 1),
          questionId: 1,
          value: 'error',
        },
      ];
  const first = data[0];
</script>

<div>MockCollectionEnterChoiceOnePlayerTwoAnswers</div>
<slot name="before" />

<slot {data} ref={{}} error={null} {first} last={null} />
{#if false}
  <slot name="loading" />
{:else if false}
  <slot name="fallback" />
{/if}
<slot name="after" />
