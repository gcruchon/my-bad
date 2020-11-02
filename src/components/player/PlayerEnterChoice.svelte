<script>
  import { Collection } from "sveltefire";
  export let userId;
  export let game;

  const questionId = game.questions[game.currentQuestionIndex];
</script>

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
      Nous avons trouvé plusieurs joueurs nvous correspondant, c'est
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
      {#if answers.length == 0}
        <p>Pour vous, c'est :</p>
        <p>
          <button
            on:click={() => answersRef.add({
                questionId: questionId,
                value: 'error',
                createdAt: Date.now(),
              })}>
            Une Erreur
          </button>
          <button
            on:click={() => answersRef.add({
                questionId: questionId,
                value: 'mistake',
                createdAt: Date.now(),
              })}>
            Une Faute
          </button>
          <button
            on:click={() => answersRef.add({
                questionId: questionId,
                value: 'failure',
                createdAt: Date.now(),
              })}>
            Un Echec
          </button>
        </p>
      {:else if answers.length > 1}
        <p>
          Nous avons trouvé plusieurs réponse pour cette question, c'est
          embarrassant...
        </p>
      {:else}
        <p>Pour vous, c'est</p>
        {#if answer.value === 'error'}
          Une Erreur
        {:else if answer.value === 'mistake'}
          Une Faute
        {:else if answer.value === 'failure'}
          Un Echec
        {:else}Réponse de type inconnu{/if}
      {/if}
      <span slot="loading">Chargement en cours...</span>
    </Collection>
  {/if}
  <span slot="loading">Chargement en cours...</span>
</Collection>
