<script>
  import { Collection } from "sveltefire";
  import { navigate } from "svelte-routing";

  import PlayerEnterName from "./PlayerEnterName.svelte";
  import PlayerEnterChoice from "./PlayerEnterChoice.svelte";
  import GameHeader from "../game/GameHeader.svelte";
  import GameFinish from "../game/GameFinish.svelte";
  import QuestionHeader from "../question/QuestionHeader.svelte";

  export let userId;
  export let gameShortId = "";
</script>

<style>
  p {
    text-align: center;
  }
</style>

<Collection
  path={'games'}
  query={(ref) => ref.where('shortId', '==', gameShortId)}
  let:data={games}
  let:ref={gameRef}
  let:first={game}
  log>
  {#if games.length == 0}
    <p>Nous n'avons pas trouvé le jeu avec l'ID "{gameShortId}"</p>
    <p>
      <button on:click={() => navigate('/player')}>
        Saisir un autre ID de jeu
      </button>
    </p>
  {:else if games.length > 1}
    <p>
      Nous avons trouvé plusieurs jeux avec ce l'ID "", c'est embarrassant...
    </p>
    <p>
      <button on:click={() => navigate('/player')}>
        Saisir un autre ID de jeu
      </button>
    </p>
  {:else}
    <GameHeader shortId={game.shortId} createdAt={game.createdAt} />
    <!-- WAITING FOR PLAYERS -->
    {#if game.state === 'waitingForPlayers'}
      <PlayerEnterName {userId} gameId={game.id} />
    {:else if game.state === 'preQuestion'}
      <QuestionHeader {game} />
      <p>Tenez-vous prêt.e !</p>
    {:else if game.state === 'question' || game.state === 'showResults' || game.state === 'showAnswer' }
      <QuestionHeader {game} />
      <PlayerEnterChoice {userId} {game} />
      <!-- FINISHED -->
    {:else if game.state === 'finished'}
      <GameFinish />
    {:else}
      <QuestionHeader {game} />
      <p>Statut non géré</p>
    {/if}
  {/if}
  <span slot="loading">Chargement en cours...</span>
</Collection>
