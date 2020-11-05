<script>
  import { Collection } from "sveltefire";
  import { navigate } from "svelte-routing";
  import GameStatus from "../game/GameStatus.svelte";
  import HostStartGame from "./HostStartGame.svelte";
  export let userId;
</script>

<style>
  .info {
    text-align: center;
    font-weight: bold;
    color: olive;
  }
  .game__empty {
    text-align: center;
  }
  .game__list {
    margin-bottom: 0;
  }
</style>

<h2>Liste des jeux en cours</h2>
<Collection
  path={'games'}
  query={(ref) => ref
      .where('creatorId', '==', userId)
      .where('state', '!=', 'finished')}
  let:data={inProgressGames}
  log>
  {#if !inProgressGames.length}
    <p class="game__empty">Aucun jeu en cours.</p>
  {:else}
    <ul class="game__list">
      {#each inProgressGames as game}
        <li>
          {game.shortId}
          - créé le
          {new Date(game.createdAt).toLocaleString()}
          -
          <GameStatus {game} />
          <button on:click={() => navigate(`/host/${game.id}`)}>
            Jouer !
          </button>
        </li>
      {/each}
    </ul>
  {/if}
  {#if inProgressGames.length < 3}
    <HostStartGame {userId} />
  {:else}
    <p class="info">Vous ne pouvez pas avoir plus de 3 jeux en cours.</p>
  {/if}
  <span slot="loading">Chargement des jeux...</span>
</Collection>

<h2>Liste des jeux terminés</h2>
<Collection
  path={'games'}
  query={(ref) => ref
      .where('creatorId', '==', userId)
      .where('state', '==', 'finished')}
  let:data={finishedGames}
  log>
  {#if !finishedGames.length}
    <p class="game__empty">Aucun jeu terminé.</p>
  {:else}
    <p class="game__list">Liste des jeux en terminés :</p>
    <ul>
      {#each finishedGames as game}
        <li>
          {game.shortId}
          - créé le
          {new Date(game.createdAt).toLocaleString()}
          - terminé le
          {new Date(game.finishedAt).toLocaleString()}
        </li>
      {/each}
    </ul>
  {/if}
  <span slot="loading">Chargement des jeux...</span>
</Collection>
