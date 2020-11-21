<script>
  import { getQuestionSetList } from './questionset';

  export let db;
  export let onChange = () => {
    console.error('looks like you forgot to set onChange function');
  };
  export let questionSet;
  let promise = getQuestionSetList(db);
</script>

<style>
  p {
    text-align: center;
  }
</style>

{#await promise}
  <p>Chargement types de jeu...</p>
{:then questionSetList}
  {#if !questionSetList.length}
    <p>Aucun type de jeu...</p>
  {:else}
    <!-- svelte-ignore a11y-no-onchange -->
    <p>
      Avec quel type de situations souhaitez-vous jouer :
      <select
        bind:value={questionSet}
        on:change={() => {
          onChange();
        }}>
        {#each questionSetList as questionSet}
          <option value={`${questionSet.id}|${questionSet.numberOfQuestions}`}>
            {questionSet.name}
          </option>
        {/each}
      </select>
    </p>
  {/if}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
