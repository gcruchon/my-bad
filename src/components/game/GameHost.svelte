<script>
  import { Doc } from 'sveltefire';
  import { navigate } from 'svelte-routing';

  import GameHeader from './GameHeader.svelte';
  import GamePlayerList from './GamePlayerList.svelte';
  import GameButtons from './GameButtons.svelte';
  import GameShowAnswerButton from './GameShowAnswerButton.svelte';
  import GameFinish from './GameFinish.svelte';
  import GameDebrief from './GameDebrief.svelte';
  import QuestionHeader from '../question/QuestionHeader.svelte';
  import HostCountDown from '../host/HostCountDown.svelte';
  import QuestionText from '../question/QuestionText.svelte';
  import QuestionResults from '../question/QuestionResults.svelte';
  import QuestionCountAnswers from '../question/QuestionCountAnswers.svelte';

  export let gameId;
</script>

<Doc path={`games/${gameId}`} let:data={game} let:ref={gameRef} log>
  <GameHeader
    shortId={game.shortId}
    createdAt={game.createdAt}
    withLink={true}
    withDateCreated={true} />

  <p class="text-center" slot="loading">Chargement du jeu...</p>
  <div class="text-center my-3" slot="fallback">
    <p class="alert alert-danger" role="alert">
      Aucun jeu trouvé avec cet ID ("{gameId}").
    </p>
    <p>
      <button class="btn btn-primary" on:click={() => navigate('/host')}>
        Retourner à l'accueil de l'animateur
      </button>
    </p>
  </div>

  <!-- WAITING FOR PLAYERS -->
  {#if game.state === 'waitingForPlayers'}
    <GamePlayerList {gameRef} />

    <!-- COUNTDOWN BEFORE QUESTION -->
  {:else if game.state === 'preQuestion'}
    <QuestionHeader {game} />
    <HostCountDown {gameRef} numberOfSeconds={5} nextState="question" />
    <!-- ASKING THE QUESTION -->
  {:else if game.state === 'question'}
    <QuestionHeader {game} />
    <HostCountDown {gameRef} numberOfSeconds={60} nextState="showResults" />
    <QuestionCountAnswers {game} {gameRef} />
    <QuestionText
      {game}
      showSituation={true}
      showAnswer={false}
      showExplanation={false} />
    <!-- SHOW WHAT PEOPLE ANSWERED -->
  {:else if game.state === 'showResults'}
    <QuestionHeader {game} />
    <QuestionText
      {game}
      showSituation={true}
      showAnswer={false}
      showExplanation={false} />
    <QuestionResults {gameId} {game} />
    <GameShowAnswerButton {gameRef} />
    <!-- SHOW THE ACTUAL CORRECT ANSWER -->
  {:else if game.state === 'showAnswer'}
    <QuestionHeader {game} />
    <QuestionText
      {game}
      showSituation={true}
      showAnswer={true}
      showExplanation={true} />
    <GameButtons {game} {gameRef} />
    <!-- FINISHED -->
  {:else if game.state === 'finished'}
    <GameFinish />
    <GameDebrief />
  {/if}
</Doc>
