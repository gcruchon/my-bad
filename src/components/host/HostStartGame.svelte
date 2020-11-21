<script>
  import { getContext } from "svelte";
  import { customAlphabet } from "nanoid/non-secure";
  import { getRandomQuestions } from "../../utils";

  export let userId;

  const app = getContext("firebase").getFirebase();
  const db = app.firestore();
  const nanoid = customAlphabet("123456789ABCDEFGHJKLMNPQRSTUVWYZ", 6);
</script>

<style>
  p {
    text-align: center;
  }
</style>

<p>
  <button
    on:click={() => db.collection('games').add({
        shortId: nanoid(),
        creatorId: userId,
        state: 'waitingForPlayers',
        currentQuestionIndex: 0,
        questions: getRandomQuestions(20),
        createdAt: Date.now(),
      })}>
    Initier un jeu !
  </button>
</p>
