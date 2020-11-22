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
  h2 {
    text-align: center;
  }
  p.started {
    margin-top: .5em;
    font-size: 80%;
    color: #999999;
    text-align: center;
  }
  p.link {
    margin-top: .5em;
    font-size: 80%;
    text-align: center;
  }
  span {
    background-color: #dddddd;
    padding: .2em .4em;
    letter-spacing: .1em;
  }
</style>

<h2>ID du jeu : <span>{shortId}</span></h2>
{#if withLink}
  <p class="link">
    Lien à partager :
    <Link to={link}>{`${getCurrentBaseURL()}${link}`}</Link>
  </p>
{/if}
{#if withDateCreated}
  <p class="started">Jeu commencé le {new Date(createdAt).toLocaleString()}</p>
{/if}
