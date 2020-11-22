<script>
  import { navigate } from 'svelte-routing';
  $: localGameShortId = '';
</script>

<p class="text-center my-4">
  Entrer l'ID du jeu :
  <input type="text" bind:value={localGameShortId} />
</p>
<p class="text-center my-4">
  <button
    class="btn btn-primary"
    on:click={() => navigate(`/player/${localGameShortId}`)}>
    Jouer !
  </button>
</p>
