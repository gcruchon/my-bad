<script>
  import { Collection } from "sveltefire";

  export let game;
  export let showSituation = true;
  export let showAnswer = false;
  export let showExplanation = false;
  const questionId = game.questions[game.currentQuestionIndex];
</script>

<style>
  .situation {
    background-color: rgb(227, 245, 251);
    margin: 1em 0;
    padding: 1em;
  }
  .situation p {
    margin: 1em;
  }
  .situation .situation__title {
    text-align: center;
    font-weight: bold;
    font-size: 120%;
    margin: 0 0 1em 0;
  }
  .answer {
    font-weight: bold;
    font-size: 140%;
    text-align: center;
  }
  .explanation {
    background-color:#eeeeee;
    margin: 1em 0;
    padding: 1em;
  }
  .explanation p {
    margin: 1em;
  }
  .explanation .explanation__title {
    text-align: center;
    font-weight: bold;
    font-size: 120%;
    margin: 0 0 1em 0;
  }
</style>

<Collection
  path={`questions`}
  query={(ref) => ref.where('questionId', '==', questionId)}
  let:data={questions}
  let:first={question}
  log>
  {#if questions.length == 0}
    <p>Oups, aucune question ne correspond à l'ID "{questionId}"</p>
  {:else if questions.length > 1}
    <p>
      Nous avons trouvé plusieurs questions avec l'ID "{questionId}", c'est
      embarrassant...
    </p>
  {:else}
    {#if showSituation}
      <div class="situation">
        <p class="situation__title">Situation</p>
        <p>{question.situation}</p>
      </div>
    {/if}
    {#if showAnswer}
      <p class="answer">
        Réponse :
        {#if question.answer === 'error'}
          <span class="error">Erreur</span>
        {:else if question.answer === 'mistake'}
          <span class="mistake">Faute</span>
        {:else if question.answer === 'failure'}
          <span class="failure">Echec</span>
        {:else}Type de réponse inconnue{/if}
      </p>
    {/if}
    {#if showExplanation}
    <div class="explanation">
      <p class="explanation__title">Explication</p>
      <p>{question.explanation}</p>
    </div>
    {/if}
  {/if}
  <span slot="loading">Chargement de la question en cours...</span>
</Collection>
