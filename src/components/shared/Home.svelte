<script>
  import { navigate } from "svelte-routing";
</script>

<!-- Styles -->
<style>
  h2 {
    text-align: center;
  }

  p {
    text-align: center;
  }
</style>

<h2>Vous souhaitez ...</h2>
<p><button on:click={() => navigate('/host')}> Animer un jeu </button></p>
<p><button on:click={() => navigate('/player')}> Rejoindre un jeu existant </button></p>
