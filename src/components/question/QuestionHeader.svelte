<script>
  export let game;
  $: question = game.questions[game.currentQuestionIndex];
</script>

<h4>Question: {question}</h4>
