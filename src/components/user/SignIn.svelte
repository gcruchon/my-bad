<script>
  export let auth
</script>

<button on:click={() => auth.signInAnonymously()}>
  Se connecter en anonyme
</button>