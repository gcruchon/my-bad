<script>
  import { Collection } from 'sveltefire';
  import { addPlayer } from './player';

  export let userId;
  export let gameId;

  $: playerName = '';
</script>

<style>
  p {
    text-align: center;
  }
</style>

<Collection
  path={`games/${gameId}/players`}
  query={ref => ref.where('userId', '==', userId)}
  let:data={players}
  let:ref={playersRef}
  let:first={currentPlayer}
  log>
  {#if players.length == 0}
    <p>Entrer votre nom : <input type="text" bind:value={playerName} /></p>
    <p>
      <button on:click={() => addPlayer(playersRef, userId, playerName)}>
        Jouer !
      </button>
    </p>
  {:else if players.length > 1}
    <p>
      Nous avons trouvé plusieurs joueurs vous correspondant, c'est
      embarrassant...
    </p>
  {:else}
    <p>Vous êtes inscrit.e, {currentPlayer.name}</p>
    <p>Le jeu n'a pas encore démarré.</p>
  {/if}
  <span slot="loading">Chargement en cours...</span>
</Collection>
