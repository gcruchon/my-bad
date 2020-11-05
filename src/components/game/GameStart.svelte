<script>
  import { customAlphabet } from "nanoid/non-secure";
  import { getRandomQuestions } from "../../utils"

  export let gameRef;

  const nanoid = customAlphabet("123456789ABCDEFGHJKLMNPQRSTUVWYZ", 8);
</script>

<style>
  p {
    text-align: center;
  }
</style>
<p>
  <button
  on:click={() => gameRef.set({
      shortId: nanoid(),
      state: 'waitingForPlayers',
      currentQuestionIndex: 0,
      questions: getRandomQuestions(20),
      createdAt: Date.now(),
    })}>
  Initier un tour!
  </button>
</p>
