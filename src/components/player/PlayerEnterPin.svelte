<script>
  import { getContext } from 'svelte';
  import { navitageWithLog } from '../../utils';
  import { focus } from '../../utils';
  $: localGameShortId = '';
  const toUpperCase = () => {
    localGameShortId = localGameShortId.toUpperCase();
  };

  const firebase = getContext('firebase').getFirebase();
</script>

<p class="text-center my-4 font-weight-bold">
  Entrer l'ID du jeu :&nbsp;
  <input
    type="text"
    bind:value={localGameShortId}
    on:input={() => toUpperCase()}
    use:focus />
</p>
<p class="text-center my-4">
  <button
    class="btn btn-primary"
    on:click={() => navitageWithLog(firebase, `/player/${localGameShortId}`)}>
    Jouer !
  </button>
</p>
