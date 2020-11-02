<script>
  import { Collection } from "sveltefire";
  export let gameRef;
</script>

<style>
  h3 {
    text-align: center;
  }
  .player__box {
    float: left;
    margin: 0.5em;
    padding: 0.5em;
    background-color: #eeeeee;
  }
  .player__empty {
    text-align: center;
    font-weight: bold;
  }
  .player__name {
    font-weight: bold;
    font-style: italic;
    font-size: 110%;
  }
  .player__list {
    margin: 1em;
  }
  .start {
    clear: both;
    margin-top: 2em;
    text-align: center;
  }
</style>

<h3>Liste des joueurs inscrits</h3>
<Collection
  path={gameRef.collection('players')}
  query={(ref) => ref.orderBy('createdAt')}
  let:data={players}
  let:ref={playersRef}
  log>
  {#if !players.length}
  <p class="player__empty">
    En attente des joueurs...
  </p>
  {:else}
    <p class="player__list">
      {#each players as player}
        <div class="player__box">
          <span class="player__name">{player.name}</span>
          <button on:click={() => player.ref.delete()}>🗑</button>
        </div>
      {/each}
    </p>
  {/if}
  <p class="start">
    <button on:click={() => gameRef.update({ state: 'preQuestion' })}>
      Commencer à jouer!
    </button>
  </p>
  <span slot="loading">Chargement des joueurs...</span>
</Collection>
