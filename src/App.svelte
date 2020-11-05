<script>
  import { Router, Route, navigate } from "svelte-routing";
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
  import PlayerHome from "./components/player/PlayerHome.svelte";
  import PlayerEnterPin from "./components/player/PlayerEnterPin.svelte";
  import HostHome from "./components/host/HostHome.svelte";
  import Home from "./Home.svelte";

  export let url = "";

  firebase.initializeApp(firebaseConfig);
</script>

<!-- Styles -->
<style>
  main {
    padding: 1em;
    max-width: 240px;
  }

  h1 {
    text-align: center;
    color: #ff3e00;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  :global(.error) {
    color: purple;
    font-weight: bold;
  }
  :global(.mistake) {
    color: orangered;
    font-weight: bold;
  }
  :global(.failure) {
    color: olive;
    font-weight: bold;
  }
</style>

<main>
  {#if !firebaseConfig.projectId}
    <strong>Please check your config...</strong>
  {/if}
  <Router {url}>
    <FirebaseApp {firebase}>
      <h1>My bad! 😅</h1>

      <User let:user let:auth>
        <ShowUser {user} {auth} />

        <div slot="signed-out">
          <SignIn {auth} />
        </div>

        <Route path="player/:gameShortId" let:params>
          <PlayerHome userId={user.uid} gameShortId="{params.gameShortId}" />
        </Route>
        <Route path="player">
          <PlayerEnterPin />
        </Route>
        <Route path="host/:gameId" let:params>
          <GameHost gameId={params.gameId} />
        </Route>
        <Route path="host">
          <HostHome userId={user.uid} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </User>
    </FirebaseApp>
  </Router>
</main>
