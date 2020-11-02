<script>
  export let shortId;
  export let createdAt;
</script>

<style>
    h2 {
      text-align: center;
    }
    p {
        margin-top: 0.5em;
        font-size: 80%;
        color: #999999;
        text-align: center;
    }
    span {
      background-color: #dddddd;
      padding: 0.2em;
    }
</style>

<h2>ID du jeu : <span>{shortId}</span></h2>
<p class="started">Jeu commencé le {new Date(createdAt).toLocaleString()}</p>
