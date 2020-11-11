<script>
  import { Router, Route } from 'svelte-routing';
  import GameHost from './components/game/GameHost.svelte';
  import PlayerHome from './components/player/PlayerHome.svelte';
  import PlayerEnterPin from './components/player/PlayerEnterPin.svelte';
  import HostHome from './components/host/HostHome.svelte';
  import Home from './components/shared/Home.svelte';

  export let url = '';
  export let userId;
</script>

<Router {url}>
  <Route path="player/:gameShortId" let:params>
    <PlayerHome {userId} gameShortId={params.gameShortId} />
  </Route>
  <Route path="player">
    <PlayerEnterPin />
  </Route>
  <Route path="host/:gameId" let:params>
    <GameHost gameId={params.gameId} />
  </Route>
  <Route path="host">
    <HostHome {userId} />
  </Route>
  <Route path="/">
    <Home />
  </Route>
</Router>
