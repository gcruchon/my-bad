<script>
  import { navigate } from "svelte-routing";
  $: localGameShortId = '';
</script>

<style>
  p {
    text-align: center;
  }
</style>

<p>Entrer l'ID du jeu : <input type="text" bind:value={localGameShortId} /></p>
<p>
  <button on:click={() => navigate(`/player/${localGameShortId}`)}>
    Jouer !
  </button>
</p>
