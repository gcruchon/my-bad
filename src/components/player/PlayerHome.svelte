<script>
    import { getContext } from 'svelte';
import { Collection } from 'sveltefire';
import { navitageWithLog } from '../../utils';

  import PlayerEnterName from './PlayerEnterName.svelte';
  import PlayerEnterChoice from './PlayerEnterChoice.svelte';
  import GameHeader from '../game/GameHeader.svelte';
  import GameFinish from '../game/GameFinish.svelte';
  import QuestionHeader from '../question/QuestionHeader.svelte';

  export let userId;
  export let gameShortId = '';

const firebase = getContext('firebase').getFirebase();
</script>

<Collection
  path={'games'}
  query={ref => ref.where('shortId', '==', gameShortId)}
  let:data={games}
  let:ref={gameRef}
  let:first={game}
  log>
  {#if games.length == 0}
    <p class="alert alert-warning text-center my-4" role="alert">
      Nous n'avons pas trouvé le jeu avec l'ID "{gameShortId}"
    </p>
    <p class="text-center">
      <button class="btn btn-primary" on:click={() => navitageWithLog(firebase, '/player')}>
        Saisir un autre ID de jeu
      </button>
    </p>
  {:else if games.length > 1}
    <p class="alert alert-danger text-center my-4" role="alert">
      {`Nous avons trouvé plusieurs jeux avec ce l'ID "${gameShortId}", c'est embarrassant...`}
    </p>
    <p class="text-center">
      <button class="btn btn-primary" on:click={() => navitageWithLog(firebase, '/player')}>
        Saisir un autre ID de jeu
      </button>
    </p>
  {:else}
    <GameHeader
      shortId={game.shortId}
      createdAt={game.createdAt}
      withLink={false}
      withDateCreated={false} />
    <!-- WAITING FOR PLAYERS -->
    {#if game.state === 'waitingForPlayers'}
      <PlayerEnterName {userId} gameId={game.id} />
    {:else if game.state === 'preQuestion'}
      <QuestionHeader {game} />
      <p class="text-center">Tenez-vous prêt•e !</p>
    {:else if game.state === 'question' || game.state === 'showResults' || game.state === 'showAnswer'}
      <QuestionHeader {game} />
      <PlayerEnterChoice {userId} {game} />
      <!-- FINISHED -->
    {:else if game.state === 'finished'}
      <GameFinish />
    {:else}
      <QuestionHeader {game} />
      <p class="alert alert-warning text-center my-4" role="alert">
        Statut non géré
      </p>
    {/if}
  {/if}
  <p class="text-center my-4" slot="loading">Chargement en cours...</p>
</Collection>
