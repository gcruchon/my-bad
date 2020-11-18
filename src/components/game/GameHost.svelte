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

<style>
  .next {
    text-align: center;
  }
</style>

<Doc path={`games/${gameId}`} let:data={game} let:ref={gameRef} log>
  <GameHeader shortId={game.shortId} createdAt={game.createdAt} />

  <span slot="loading">Chargement du jeu...</span>
  <span slot="fallback">
    Aucun jeu trouvé avec cet ID ("{gameId}").
    <button on:click={() => navigate('/host')}>
      Retourner à l'accueil de l'animateur
    </button>
  </span>

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
