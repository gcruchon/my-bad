<script>
  import { Router, Route } from "svelte-routing";
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
  import Home from "./components/shared/Home.svelte";
  import Title from "./components/shared/Title.svelte";
  import Footer from "./components/shared/Footer.svelte";

  export let url = "";

  firebase.initializeApp(firebaseConfig);
</script>

<!-- Styles -->
<style>
  main {
    padding: 0 1.5em;
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

{#if !firebaseConfig.projectId}<strong>Please check your config...</strong>{/if}
<Router {url}>
  <FirebaseApp {firebase}>
    <User persist={sessionStorage} let:user let:auth>
      <ShowUser {user} {auth} />

      <main>
        <Title />

        <Route path="player/:gameShortId" let:params>
          <PlayerHome userId={user.uid} gameShortId={params.gameShortId} />
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
      </main>

      <div slot="signed-out">
        <main>
          <Title />
          <SignIn {auth} {firebase} />
        </main>
      </div>
    </User>
  </FirebaseApp>
</Router>
<Footer />
