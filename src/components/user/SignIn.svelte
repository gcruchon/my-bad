<script>
  export let auth;
</script>

<style>
  hr {
    height: 1px;
    border: none;
    background: rgb(195, 195, 195);
  }
  p {
    text-align: center;
    margin: 1.5em 0;
  }
</style>

<hr />
<p>
  <button on:click={() => auth.signInAnonymously()}>
    Me connecter en anonyme
  </button>
</p>
<hr />
