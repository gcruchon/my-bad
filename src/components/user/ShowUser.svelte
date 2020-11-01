<script>
  export let user
  export let auth
</script>

Salut 😀! Utilisateur
<em>{user.uid}</em>

<button on:click={() => auth.signOut()}>Se déconnecter</button>