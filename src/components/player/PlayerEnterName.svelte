<script>
  import { getContext, onMount } from 'svelte';
  import { Collection } from 'sveltefire';
  import { addPlayer } from './player';
  import { focus } from '../../utils';

  export let userId;
  export let gameId;

  const firebase = getContext('firebase').getFirebase();

  const user = firebase.auth().currentUser;
  $: playerName = user && user.displayName ? user.displayName : '';

  const addPlayerWithLog = (playersRef, userId, playerName) => {
    addPlayer(playersRef, userId, playerName);
  };
</script>

<Collection
  path={`games/${gameId}/players`}
  query={ref => ref.where('userId', '==', userId)}
  let:data={players}
  let:ref={playersRef}
  let:first={currentPlayer}
  log>
  {#if players.length == 0}
    <p class="text-center my-4 font-weight-bold">
      Entrer votre nom :&nbsp;
      <input type="text" bind:value={playerName} use:focus />
    </p>
    <p class="text-center my-4">
      <button
        class="btn btn-primary"
        on:click={() => addPlayerWithLog(playersRef, userId, playerName)}>
        Jouer !
      </button>
    </p>
  {:else if players.length > 1}
    <p class="alert alert-danger text-center my-4" role="alert">
      Nous avons trouvé plusieurs joueurs vous correspondant, c'est
      embarrassant...
    </p>
  {:else}
    <div class="alert alert-info text-center my-4" role="alert">
      <p>Vous êtes inscrit•e, {currentPlayer.name}</p>
      <p class="font-weight-bold">Le jeu n'a pas encore démarré.</p>
    </div>
  {/if}
  <p class="text-center my-4" slot="loading">Chargement en cours...</p>
</Collection>
