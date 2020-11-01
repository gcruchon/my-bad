<script>
  import { FirebaseApp, User } from "sveltefire";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";

  import firebaseConfig from "./config/firebaseConfig";

  import ShowUser from "./components/user/ShowUser.svelte";
  import SignIn from "./components/user/SignIn.svelte";
  import GameHost from "./components/game/GameHost.svelte";
  import GameStart from "./components/game/GameStart.svelte";
  import GamePlayers from "./components/game/GamePlayers.svelte";
  import QuestionHeader from "./components/question/QuestionHeader.svelte";
  import QuestionCountDown from "./components/question/QuestionCountDown.svelte";

  firebase.initializeApp(firebaseConfig);

  $: userType = "";
  let updateUserType = (type) => {
    userType = type;
  };
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
  {/if}

  <!-- 1. 🔥 Firebase App -->
  <FirebaseApp {firebase}>
    <h1>My bad! 😅</h1>

    <!-- 2. 😀 Get the current user -->
    <User let:user let:auth>
      <ShowUser {user} {auth} />

      <div slot="signed-out">
        <SignIn {auth} />
      </div>

      <hr />

      {#if userType === 'host'}
        <GameHost userId={user.uid} />
      {:else if userType === 'player'}
        <p>Player</p>
      {:else}
        <h2>Que souhaitez-vous faire ?</h2>

        <p>
          <button
            on:click={() => {
              updateUserType('host');
            }}>
            Initier un nouveau jeu
          </button>
        </p>
        <p>
          <button
            on:click={() => {
              updateUserType('player');
            }}>
            Rejoindre un jeu existant
          </button>
        </p>
      {/if}

    </User>
  </FirebaseApp>
</main>
