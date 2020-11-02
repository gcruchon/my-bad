<script>
  export let game;
  $: questionId = game.questions[game.currentQuestionIndex];
</script>

<style>
  h4 {
    text-align: center;
    font-size: 140%;
  }
</style>

<h4>Question n°{questionId}</h4>
