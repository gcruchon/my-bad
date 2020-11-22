<script>
  import { Collection } from 'sveltefire';
  export let gameRef;
</script>

<style>
  .btn.btn-primary .oi {
    padding-right: 0;
    font-size: 80%;
  }
</style>

<div class="alert alert-info" role="alert">
  <p class="font-weight-bold m-0">
    <span class="oi oi-info pr-1" />
    Conseils :
  </p>
  <ul>
    <li>
      Pour jouer, créez une visioconférence et
      <em class="font-weight-bold">partagez votre écran</em>.
    </li>
    <li>
      Demandez aux joueurs de se connecter via mobile et fournissez-leur le lien
      indiqué ci-dessus !
    </li>
  </ul>
</div>
<p class="h4 text-center">Liste des joueurs inscrits</p>
<Collection
  path={gameRef.collection('players')}
  query={ref => ref.orderBy('createdAt')}
  let:data={players}
  log>
  {#if !players.length}
    <p class="text-center">
      <span class="oi oi-timer pr-1 mt-4" />En attente de joueurs...
    </p>
  {:else}
    <p class="m-3 clearfix">
      {#each players as player}
        <div
          class="alert alert-primary rounded-pill m-3 pt-1 pb-0 px-4 float-left">
          <span class="font-weight-bold font-italic pr-2">{player.name}</span>
          <button
            class="btn btn-primary py-1 px-2"
            on:click={() => player.ref.delete()}><span
              class="oi oi-trash" /></button>
        </div>
      {/each}
    </p>
  {/if}
  <p class="text-center mt-4">
    <button
      class="btn btn-success"
      on:click={() => gameRef.update({ state: 'preQuestion' })}>
      Commencer la partie !
    </button>
  </p>
  <p class="text-center" slot="loading">Chargement des joueurs...</p>
</Collection>
