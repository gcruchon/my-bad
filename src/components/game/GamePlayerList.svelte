<script>
  import { Collection } from 'sveltefire';
  export let gameRef;
</script>

<style>
  h2 {
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
    text-align: center;
    margin: 1em;
  }
  .start {
    clear: both;
    margin-top: 2em;
    text-align: center;
  }
  .tips {
    padding: 1em 0;
    margin: 1em 0;
  }
  .tips p, .tips ul {
    margin: 0;
  }
</style>

<h2>Liste des joueurs inscrits</h2>
<div class="tips">
  <p>Tips :</p>
  <ul>
    <li>Pour jouer, créez une visioconférence et partagez votre écran.</li>
    <li>
      Demandez aux joueurs de se connecter via mobile et fournissez-leur le lien
      indiqué ci-dessus !
    </li>
  </ul>
</div>
<Collection
  path={gameRef.collection('players')}
  query={ref => ref.orderBy('createdAt')}
  let:data={players}
  log>
  {#if !players.length}
    <p class="player__empty">En attente des joueurs...</p>
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
      Commencer la partie !
    </button>
  </p>
  <span slot="loading">Chargement des joueurs...</span>
</Collection>
