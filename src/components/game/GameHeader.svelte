<script>
  export let shortId;
  export let createdAt;
</script>

<style>
    p.started {
        font-size: 80%;
        color: #999999;
    }
</style>

<h2>ID du jeu : {shortId}</h2>
<p class="started">Jeu commencé le <em>{new Date(createdAt).toLocaleString()}</em></p>
