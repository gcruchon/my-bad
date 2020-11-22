<script>
  import { navigate } from 'svelte-routing';
  import { focus } from '../../utils';
  $: localGameShortId = '';
  const toUpperCase = () => {
    localGameShortId = localGameShortId.toUpperCase();
  };
</script>

<p class="text-center my-4 font-weight-bold">
  Entrer l'ID du jeu :&nbsp;
  <input type="text" bind:value={localGameShortId} on:input={() => toUpperCase()} use:focus />
</p>
<p class="text-center my-4">
  <button
    class="btn btn-primary"
    on:click={() => navigate(`/player/${localGameShortId}`)}>
    Jouer !
  </button>
</p>
