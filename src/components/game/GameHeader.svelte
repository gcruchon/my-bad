<script>
  import { Link } from 'svelte-routing';
  import { getCurrentBaseURL } from '../../utils';
  export let shortId;
  export let createdAt;
  export let withLink = false;
  export let withDateCreated = false;

  const link = `/player/${shortId}`;
</script>

<style>
  .small {
    font-size: 80%;
  }
  span {
    background-color: #dddddd;
    padding: .2em .4em;
    letter-spacing: .1em;
  }
</style>

<p class="h4 text-center mt-4">ID du jeu : <span>{shortId}</span></p>
{#if withLink}
  <p class="text-center my-2 link small">
    Lien à partager :
    <Link to={link}>{`${getCurrentBaseURL()}${link}`}</Link>
  </p>
{/if}
{#if withDateCreated}
  <p class="text-center text-muted started my-2 small">Jeu commencé le {new Date(createdAt).toLocaleString()}</p>
{/if}
