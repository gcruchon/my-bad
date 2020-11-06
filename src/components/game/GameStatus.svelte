<script>
  export let game;
</script>

{#if game.state == 'waitingForPlayers'}
  En attente de joueurs
{:else if game.state == 'preQuestion' || game.state == 'question' || game.state == 'showResults' || game.state == 'showAnswer'}
  Question n°{game.currentQuestionIndex + 1}
{:else}Statut inconnu "{game.state}""{/if}
