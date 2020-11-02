<script>
  export let game;
  $: questionId = game.questions[game.currentQuestionIndex];
</script>

<h4>Question: {questionId}</h4>
