<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import { customAlphabet } from "nanoid/non-secure";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";

  import firebaseConfig from "./config/firebaseConfig";

  import ShowUser from "./components/user/ShowUser.svelte"
  import SignIn from "./components/user/SignIn.svelte"

  firebase.initializeApp(firebaseConfig);
  const nanoid = customAlphabet("1234567890ABCDEFGHJKLMNPQRSTUVWYZ", 8);
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
        <h2>ID du jeu : {game.id}</h2>

        <p>
          Jeu commencé le
          <em>{new Date(game.createdAt).toLocaleString()}</em>
        </p>

        <span slot="loading">Loading game...</span>
        <span slot="fallback">
          <button
            on:click={() => gameRef.set({
                id: nanoid(),
                state: 'waitingForPlayers',
                currentQuestionIndex: 0,
                questions: [1, 2, 3, 4, 5, 6],
                createdAt: Date.now(),
              })}>
            Initier un tour!
          </button>
        </span>

        <!-- WAITING FOR PLAYERS -->
        {#if game.state === 'waitingForPlayers'}
          <h3>Players</h3>
          <Collection
            path={gameRef.collection('players')}
            query={(ref) => ref.orderBy('createdAt')}
            let:data={players}
            let:ref={playersRef}
            log>
            {#if !players.length}En attente des joueurs...{/if}

            {#each players as player}
              <p>
                <!-- ID: <em>{comment.ref.id}</em> -->
              </p>
              <p>
                {player.name}
                <button on:click={() => player.ref.delete()}>Supprimer</button>
              </p>
            {/each}

            <button
              on:click={() => playersRef.add({
                  name: 'Gilles',
                  createdAt: Date.now(),
                })}>
              Ajouter un joueur
            </button>
            <button
              on:click={() => gameRef.update({
                state: 'preQuestion',
                })}>
              Commencer à jouer!
            </button>
            <span slot="loading">Chargement des joueurs...</span>
          </Collection>

        <!-- COUNTDOWN BEFORE QUESTION -->
        {:else if game.state === 'preQuestion'}
          <h3>preQuestion</h3>
          <p>Question: {game.currentQuestionIndex + 1}</p>
          <button
            on:click={() => gameRef.update({
              state: 'question',
              })}>
            Lire la question!
          </button>
        <!-- ASKING THE QUESTION -->
        {:else if game.state === 'question'}
          <h3>question</h3>
          <p>Question: {game.currentQuestionIndex + 1}</p>
          <button
            on:click={() => gameRef.update({
              state: 'showResults',
              })}>
            Stop!
          </button>
        <!-- SHOW WHAT PEOPLE ANSWERED -->
        {:else if game.state === 'showResults'}
          <h3>showResults</h3>
          <p>Question: {game.currentQuestionIndex + 1}</p>
          <button
            on:click={() => gameRef.update({
              state: 'showAnswer',
              })}>
            Voir la réponse!
          </button>
        <!-- SHOW THE ACTUAL CORRECT ANSWER -->
        {:else if game.state === 'showAnswer'}
          <h3>answer</h3>
          <p>Question: {game.currentQuestionIndex + 1}</p>
          <button
            on:click={() => gameRef.update({
              state: 'leaderboard',
              })}>
            Voir le classement!
          </button>
        <!-- SHOW THE LEADERBOARD -->
        {:else if game.state === 'leaderboard'}
          <h3>Classement</h3>
          <p>Question: {game.currentQuestionIndex + 1}</p>
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
