<script>
  import { Link } from "svelte-routing";
  export let shortId;
  export let createdAt;

  const link = `/player/${shortId}`;
</script>

<style>
  h2 {
    text-align: center;
  }
  p.started {
    margin-top: 0.5em;
    font-size: 80%;
    color: #999999;
    text-align: center;
  }
  p.link {
    margin-top: 0.5em;
    font-size: 80%;
    text-align: center;
  }
  span {
    background-color: #dddddd;
    padding: 0.2em;
  }
</style>

<h2>ID du jeu : <span>{shortId}</span></h2>
<p class="link">
  Lien à partager :
  <Link to={link}>https://my-bad-game.web.app{link}</Link>
</p>
<p class="started">Jeu commencé le {new Date(createdAt).toLocaleString()}</p>
