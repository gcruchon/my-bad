<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";

  import firebaseConfig from "./config/firebaseConfig";

  import ShowUser from "./components/user/ShowUser.svelte"
  import SignIn from "./components/user/SignIn.svelte"
  import GameHeader from "./components/game/GameHeader.svelte"
  import GameStart from "./components/game/GameStart.svelte"
  import GamePlayers from "./components/game/GamePlayers.svelte"
  import QuestionHeader from "./components/question/QuestionHeader.svelte"
  import QuestionCountDown from "./components/question/QuestionCountDown.svelte"

  firebase.initializeApp(firebaseConfig);
</script>

<!-- Styles -->
<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1,
  em {
    color: #ff3e00;
  }

  hr {
    height: 1px;
    border: none;
    background: rgb(195, 195, 195);
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  {#if !firebaseConfig.projectId}
    <strong>Please check your config...</strong>
    .
  {/if}

  <!-- 1. 🔥 Firebase App -->
  <FirebaseApp {firebase}>
    <h1>My bad! 😅</h1>

    <!-- 2. 😀 Get the current user -->
    <User let:user let:auth>
      <ShowUser user={user} auth={auth}/>
      
      <div slot="signed-out">
        <SignIn auth={auth}/>
      </div>

      <hr />

      <!-- 3. 📜 Get a Firestore document owned by a user -->
      <Doc path={`games/${user.uid}`} let:data={game} let:ref={gameRef} log>
        <GameHeader id={game.id} createdAt={game.createdAt} />

        <span slot="loading">Chargement du jeu...</span>
        <span slot="fallback">
          <GameStart gameRef={gameRef} />
        </span>

        <!-- WAITING FOR PLAYERS -->
        {#if game.state === 'waitingForPlayers'}
          <GamePlayers gameRef={gameRef} />

        <!-- COUNTDOWN BEFORE QUESTION -->
        {:else if game.state === 'preQuestion'}
          <QuestionHeader game={game} />
          <QuestionCountDown gameRef={gameRef} numberOfSeconds={5} nextState="question" />
        <!-- ASKING THE QUESTION -->
        {:else if game.state === 'question'}
          <QuestionHeader game={game} />
          <QuestionCountDown gameRef={gameRef} numberOfSeconds={30} nextState="showResults" />
          <p>Texte de la question</p>
        <!-- SHOW WHAT PEOPLE ANSWERED -->
        {:else if game.state === 'showResults'}
          <h3>showResults</h3>
          <QuestionHeader game={game} />
          <button
            on:click={() => gameRef.update({
              state: 'showAnswer',
              })}>
            Voir la réponse!
          </button>
        <!-- SHOW THE ACTUAL CORRECT ANSWER -->
        {:else if game.state === 'showAnswer'}
          <h3>answer</h3>
          <QuestionHeader game={game} />
          <button
            on:click={() => gameRef.update({
              state: 'leaderboard',
              })}>
            Voir le classement!
          </button>
        <!-- SHOW THE LEADERBOARD -->
        {:else if game.state === 'leaderboard'}
          <h3>Classement</h3>
          <QuestionHeader game={game} />
          <button
            on:click={() => gameRef.update({
              state: 'preQuestion',
              currentQuestionIndex: game.currentQuestionIndex + 1,
              })}>
            Prochaine question!
          </button>
        {/if}
      </Doc>
    </User>
  </FirebaseApp>
</main>
