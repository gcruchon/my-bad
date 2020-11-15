<script>
  import { Collection } from "sveltefire";
  import { saveAnswer } from "./player";
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
  query={(ref) => ref.where('userId', '==', userId)}
  let:data={players}
  let:first={currentPlayer}
  log>
  {#if players.length == 0}
    <p>Vous n'êtes pas inscrit à ce jeu... désolé</p>
  {:else if players.length > 1}
    <p>
      Nous avons trouvé plusieurs joueurs vous correspondant, c'est
      embarrassant...
    </p>
  {:else}
    <Collection
      path={currentPlayer.ref.collection('answers')}
      query={(ref) => ref.where('questionId', '==', questionId)}
      let:data={answers}
      let:ref={answersRef}
      let:first={answer}
      log>
      {#if answers.length === 0}
        {#if game.state === 'question'}
          <p>Pour vous, c'est :</p>
          <p>
            <button
              on:click={() => saveAnswer(answersRef, questionId, 'error')}>
              une
              <span class="error">erreur</span>
            </button>
            <button
              on:click={() => saveAnswer(answersRef, questionId, 'mistake')}>
              une
              <span class="mistake">faute</span>
            </button>
            <button
              on:click={() => saveAnswer(answersRef, questionId, 'failure')}>
              un
              <span class="failure">échec</span>
            </button>
          </p>
        {:else}
          <p>Trop tard, vous n'avez pas répondu...</p>
        {/if}
      {:else if answers.length > 1}
        <p>
          Nous avons trouvé plusieurs réponses pour cette question, c'est
          embarrassant...
        </p>
      {:else}
        <p>
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
      <span slot="loading">Chargement en cours...</span>
    </Collection>
  {/if}
  <span slot="loading">Chargement en cours...</span>
</Collection>
