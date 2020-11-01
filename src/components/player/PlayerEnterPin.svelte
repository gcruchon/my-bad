<script>
  import { gameShortId } from "../../stores";
  $: localGameShortId = $gameShortId;
  let updateGameShortId = () => {
    $gameShortId = localGameShortId;
  };
</script>

<p>Entrer l'ID du jeu: <input type="text" bind:value={localGameShortId} /></p>
<p>
  <button
    on:click={() => {
      updateGameShortId();
    }}>
    Jouer !
  </button>
</p>
