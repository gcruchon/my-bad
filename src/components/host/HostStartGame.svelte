<script>
  import { getContext } from 'svelte';
  import { customAlphabet } from 'nanoid/non-secure';
  import { getRandomQuestions } from '../../utils';
  import QuestionSetList from '../questionset/QuestionSetList.svelte';

  export let userId;

  let questionSetId = 'default';
  let numberOfQuestions = 20;
  let questionSet = `${questionSetId}|${numberOfQuestions}`;

  const changeQuestionSet = () => {
    [questionSetId, numberOfQuestions] = questionSet.split('|');
    numberOfQuestions = parseInt(numberOfQuestions, 10);
    console.log('numberOfQuestions', numberOfQuestions);
  };

  const app = getContext('firebase').getFirebase();
  const db = app.firestore();

  const nanoid = customAlphabet('123456789ABCDEFGHJKLMNPQRSTUVWYZ', 6);
</script>

<style>
  p {
    text-align: center;
  }
  div {
      margin: 2em;
      border: #ccc 1px dashed;
      padding: 1em;
      background-color: #eee;
  }
</style>

<div>
  <QuestionSetList {db} bind:questionSet onChange={() => changeQuestionSet()} />
  <p>
    <button
      on:click={() => db
          .collection('games')
          .add({
            shortId: nanoid(),
            creatorId: userId,
            state: 'waitingForPlayers',
            questionSetId,
            currentQuestionIndex: 0,
            questions: getRandomQuestions(numberOfQuestions),
            createdAt: Date.now(),
          })}>
      Initier un jeu !
    </button>
  </p>
</div>
