<script>
  import { Collection } from 'sveltefire';
  import { saveAnswer } from './player';
  export let userId;
  export let game;

  const questionId = game.questions[game.currentQuestionIndex];
</script>

<style>
  p {
    text-align: center;
  }
</style>

<Collection
  path={`games/${game.id}/players`}
  query={ref => ref.where('userId', '==', userId)}
  let:data={players}
  let:first={currentPlayer}
  log>
  {#if players.length == 0}
    <p class="alert alert-danger text-center my-4" role="alert">
      Vous n'êtes pas inscrit à ce jeu... désolé
    </p>
  {:else if players.length > 1}
    <p class="alert alert-danger text-center my-4" role="alert">
      Nous avons trouvé plusieurs joueurs vous correspondant, c'est
      embarrassant...
    </p>
  {:else}
    <Collection
      path={currentPlayer.ref.collection('answers')}
      query={ref => ref.where('questionId', '==', questionId)}
      let:data={answers}
      let:ref={answersRef}
      let:first={answer}
      log>
      {#if answers.length === 0}
        {#if game.state === 'question'}
          <p class="text-center my-4">Pour vous, c'est :</p>
          <p class="text-center">
            <button
              class="btn btn-light btn-lg btn-block my-4 py-4 border border-secondary"
              on:click={() => saveAnswer(answersRef, questionId, 'error')}>
              une
              <span class="error">erreur</span>
            </button>
            <button
              class="btn btn-light btn-lg btn-block my-4 py-4 border border-secondary"
              on:click={() => saveAnswer(answersRef, questionId, 'mistake')}>
              une
              <span class="mistake">faute</span>
            </button>
            <button
              class="btn btn-light btn-lg btn-block my-4 py-4 border border-secondary"
              on:click={() => saveAnswer(answersRef, questionId, 'failure')}>
              un
              <span class="failure">échec</span>
            </button>
          </p>
        {:else}
          <p class="alert alert-warning text-center my-4" role="alert">
            Trop tard, vous n'avez pas répondu...
          </p>
        {/if}
      {:else if answers.length > 1}
        <p class="alert alert-danger text-center my-4" role="alert">
          Nous avons trouvé plusieurs réponses pour cette question, c'est
          embarrassant...
        </p>
      {:else}
        <p class="alert alert-info text-center my-4">
          Pour vous, c'est
          {#if answer.value === 'error'}
            une
            <span class="error">erreur</span>
          {:else if answer.value === 'mistake'}
            une
            <span class="mistake">faute</span>
          {:else if answer.value === 'failure'}
            un
            <span class="failure">échec</span>
          {:else}une réponse de type inconnu...{/if}
        </p>
      {/if}
      <p class="text-center" slot="loading">Chargement en cours...</p>
    </Collection>
  {/if}
  <p class="text-center" slot="loading">Chargement en cours...</p>
</Collection>
