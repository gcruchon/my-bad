<script>
  import { Doc } from "sveltefire";

  import GameHeader from "./GameHeader.svelte";
  import GameStart from "./GameStart.svelte";
  import GamePlayerList from "./GamePlayerList.svelte";
  import QuestionHeader from "../question/QuestionHeader.svelte";
  import QuestionCountDown from "../question/QuestionCountDown.svelte";

  export let userId;
</script>

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
    <p>Texte de la question</p>
    <!-- SHOW WHAT PEOPLE ANSWERED -->
  {:else if game.state === 'showResults'}
    <h3>showResults</h3>
    <QuestionHeader {game} />
    <button on:click={() => gameRef.update({ state: 'showAnswer' })}>
      Voir la réponse!
    </button>
    <!-- SHOW THE ACTUAL CORRECT ANSWER -->
  {:else if game.state === 'showAnswer'}
    <h3>answer</h3>
    <QuestionHeader {game} />
    <button on:click={() => gameRef.update({ state: 'leaderboard' })}>
      Voir le classement!
    </button>
    <!-- SHOW THE LEADERBOARD -->
  {:else if game.state === 'leaderboard'}
    <h3>Classement</h3>
    <QuestionHeader {game} />
    <button
      on:click={() => gameRef.update({
          state: 'preQuestion',
          currentQuestionIndex: game.currentQuestionIndex + 1,
        })}>
      Prochaine question!
    </button>
  {/if}
</Doc>
