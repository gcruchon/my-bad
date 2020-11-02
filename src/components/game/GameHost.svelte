<script>
  import { Doc } from "sveltefire";

  import GameHeader from "./GameHeader.svelte";
  import GameStart from "./GameStart.svelte";
  import GamePlayerList from "./GamePlayerList.svelte";
  import QuestionHeader from "../question/QuestionHeader.svelte";
  import QuestionCountDown from "../question/QuestionCountDown.svelte";
  import QuestionText from "../question/QuestionText.svelte";
  import QuestionResults from "../question/QuestionResults.svelte";

  export let userId;
</script>

<style>
  .next {
    padding: 2em;
    text-align: center;
  }
</style>

<Doc path={`games/${userId}`} let:data={game} let:ref={gameRef} log>
  <GameHeader shortId={game.shortId} createdAt={game.createdAt} />

  <span slot="loading">Chargement du jeu...</span>
  <span slot="fallback">
    <GameStart {gameRef} />
  </span>

  <!-- WAITING FOR PLAYERS -->
  {#if game.state === 'waitingForPlayers'}
    <GamePlayerList {gameRef} />

    <!-- COUNTDOWN BEFORE QUESTION -->
  {:else if game.state === 'preQuestion'}
    <QuestionHeader {game} />
    <QuestionCountDown {gameRef} numberOfSeconds={5} nextState="question" />
    <!-- ASKING THE QUESTION -->
  {:else if game.state === 'question'}
    <QuestionHeader {game} />
    <QuestionCountDown {gameRef} numberOfSeconds={30} nextState="showResults" />
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
    <QuestionResults gameId={userId} {game} />
    <p class="next">
      <button on:click={() => gameRef.update({ state: 'showAnswer' })}>
        Voir la réponse!
      </button>
    </p>
    <!-- SHOW THE ACTUAL CORRECT ANSWER -->
  {:else if game.state === 'showAnswer'}
    <QuestionHeader {game} />
    <QuestionText
      {game}
      showSituation={true}
      showAnswer={true}
      showExplanation={true} />
    <p class="next">
      <button on:click={() => gameRef.update({ state: 'leaderboard' })}>
        Voir le classement!
      </button>
    </p>
    <!-- SHOW THE LEADERBOARD -->
  {:else if game.state === 'leaderboard'}
    <QuestionHeader {game} />
    <h4>Leaderboard : TODO</h4>
    <p class="next">
      <button
        on:click={() => gameRef.update({
            state: 'preQuestion',
            currentQuestionIndex: game.currentQuestionIndex + 1,
          })}>
        Prochaine question!
      </button>
    </p>
  {/if}
</Doc>
