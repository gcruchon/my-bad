<script>
  import { customAlphabet } from "nanoid/non-secure";

  export let gameRef;

  const nanoid = customAlphabet("1234567890ABCDEFGHJKLMNPQRSTUVWYZ", 8);
</script>

<button
on:click={() => gameRef.set({
    shortId: nanoid(),
    state: 'waitingForPlayers',
    currentQuestionIndex: 0,
    questions: [1, 2, 3],
    createdAt: Date.now(),
  })}>
Initier un tour!
</button>
