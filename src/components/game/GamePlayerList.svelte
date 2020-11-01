<script>
  import { Collection } from "sveltefire";
  export let gameRef;
</script>

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
    on:click={() => playersRef.add({ name: 'Gilles', createdAt: Date.now() })}>
    Ajouter un joueur
  </button>
  <button
    on:click={() => gameRef.update({ state: 'preQuestion' })}>
    Commencer à jouer!
  </button>
  <span slot="loading">Chargement des joueurs...</span>
</Collection>
