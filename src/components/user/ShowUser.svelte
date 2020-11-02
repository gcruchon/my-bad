<script>
  export let user;
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
  Salut, utilisateur <em>{user.uid}</em> !
  <button on:click={() => auth.signOut()}>Me déconnecter</button>
</p>

<hr />
