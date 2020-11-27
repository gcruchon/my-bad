<script>
  import { Collection } from 'sveltefire';
  import marked from 'marked';
  import DOMPurify from 'dompurify';

  export let game;
  export let showSituation = true;
  export let showAnswer = false;
  export let showExplanation = false;

  const questionId = game.questions[game.currentQuestionIndex];
  const questionSetId = game.questionSetId || 'default';

  const mdToHtml = text => {
    return DOMPurify.sanitize(marked(text.replace(/\\n/gi, '\n')));
  };
</script>

<Collection
  path={`questions`}
  query={ref => ref
      .where('questionId', '==', questionId)
      .where('questionSetId', '==', questionSetId)}
  let:data={questions}
  let:first={question}
  log>
  {#if questions.length == 0}
    <p class="alert alert-danger text-center">
      Oups, aucune question ne correspond à l'ID "{questionId}" pour le
      questionSetId "{questionSetId}"
    </p>
  {:else if questions.length > 1}
    <p class="alert alert-danger text-center">
      Nous avons trouvé plusieurs questions avec l'ID "{questionId}" pour le
      questionSetId "{questionSetId}", c'est embarrassant...
    </p>
  {:else}
    {#if showSituation}
      <div class="alert alert-primary mb-0">
        <p class="font-weight-bold text-center">Situation</p>
        <p>
          {@html mdToHtml(question.situation)}
        </p>
      </div>
      <p class="text-right font-italic text-muted mt-0 small">
        Situation {questionId}
      </p>
    {/if}
    {#if showAnswer}
      <p class="h4 text-center font-weight-bold my-4">
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
      <div class="alert alert-success">
        <p class="font-weight-bold text-center">Explication</p>
        <p>
          {@html mdToHtml(question.explanation)}
        </p>
      </div>
    {/if}
  {/if}
  <p class="text-center" slot="loading">
    Chargement de la question en cours...
  </p>
</Collection>
