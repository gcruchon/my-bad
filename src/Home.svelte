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

<h2>Vous êtes...</h2>
<p><button on:click={() => navigate('/host')}> Un animateur </button></p>
<p><button on:click={() => navigate('/player')}> Un joueur </button></p>
