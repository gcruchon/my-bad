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

<p class="h4 mt-4">Initier un nouveau jeu</p>
<QuestionSetList {db} bind:questionSet onChange={() => changeQuestionSet()} />
<p>
  <button
    class="btn btn-secondary"
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
    <span class="oi oi-plus" />
    Initier un jeu !
  </button>
</p>
