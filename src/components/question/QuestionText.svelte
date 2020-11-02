<script>
  import { Collection } from "sveltefire";

  export let game;
  export let showSituation = true;
  export let showAnswer = false;
  export let showExplanation = false;
  const questionId = game.questions[game.currentQuestionIndex];
</script>

<style>
  p.question {
    text-align: left;
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
      <p class="question">Situation :</p>
      <p class="question">{question.situation}</p>
    {/if}
    {#if showAnswer}
      <p class="question">
        Réponse :
        {#if question.answer === 'error'}
          Erreur
        {:else if question.answer === 'failure'}
          Echec
        {:else if question.answer === 'mistake'}
          Faute
        {:else}Type de réponse inconnue{/if}
      </p>
    {/if}
    {#if showExplanation}
      <p class="question">Explication :</p>
      <p class="question">{question.explanation}</p>
    {/if}
  {/if}
  <span slot="loading">Chargement de la question en cours...</span>
</Collection>
