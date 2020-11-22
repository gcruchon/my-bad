<script>
  import { Collection } from 'sveltefire';
  import { navigate } from 'svelte-routing';
  import GameStatus from '../game/GameStatus.svelte';
  import HostStartGame from './HostStartGame.svelte';
  export let userId;
</script>

<style>
  .small {
    font-size: 80%;
  }
</style>

<p class="h4">Liste des jeux en cours</p>
<Collection
  path={'games'}
  query={ref => ref
      .where('creatorId', '==', userId)
      .where('state', '!=', 'finished')}
  let:data={inProgressGames}
  log>
  {#if !inProgressGames.length}
    <p class="text-center">Aucun jeu en cours.</p>
  {:else}
    <ul>
      {#each inProgressGames as game}
        <li>
          <span class="font-weight-bold">{game.shortId}</span>
          <span class="small">
            créé le
            {new Date(game.createdAt).toLocaleString()}
          </span>
          -
          <GameStatus {game} />
          <button
            class="btn btn-primary"
            on:click={() => navigate(`/host/${game.id}`)}>
            <span class="oi oi-media-play" />
            Jouer !
          </button>
        </li>
      {/each}
    </ul>
  {/if}
  {#if inProgressGames.length < 3}
    <HostStartGame {userId} />
  {:else}
    <p class="alert alert-info mt-4" role="alert">Vous ne pouvez pas avoir plus de 3 jeux en cours.</p>
  {/if}
  <span slot="loading">Chargement des jeux...</span>
</Collection>

<p class="h4 text-secondary mt-4">Liste des jeux terminés</p>
<Collection
  path={'games'}
  query={ref => ref
      .where('creatorId', '==', userId)
      .where('state', '==', 'finished')}
  let:data={finishedGames}
  log>
  {#if !finishedGames.length}
    <p class="text-secondary text-center">Aucun jeu terminé.</p>
  {:else}
    <ul class="text-secondary">
      {#each finishedGames as game}
        <li>
          <span class="font-weight-bold">{game.shortId}</span>
          <span class="small">
            terminé le
            {new Date(game.finishedAt).toLocaleString()}
          </span>
        </li>
      {/each}
    </ul>
  {/if}
  <span class="text-secondary" slot="loading">Chargement des jeux...</span>
</Collection>
