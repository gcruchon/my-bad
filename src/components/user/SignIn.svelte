<script>
  export let auth;
  export let firebase;

  const loginWithGoogle = () => {
    const google = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(google);
  };

const supportedProviders = [
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  firebase.auth.FacebookAuthProvider.PROVIDER_ID,
];

function getButtonName(providerId) {
  switch (providerId) {
    case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
      return "Me connecter avec Google";
    case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
      return "Me connecter avec Facebook";
    default:
      throw new Error(`No provider implemented for ${providerId}`);
  }
}

const loginWithFacebook = async () => {
  const facebook = new firebase.auth.FacebookAuthProvider();
  try {
    await auth.signInWithPopup(facebook);
  } catch (err) {
    if (err.email && err.credential && err.code === 'auth/account-exists-with-different-credential') {

      const providers = await firebase.auth().fetchSignInMethodsForEmail(err.email)
      const providerId = providers.find(p => supportedProviders.includes(p));

      if (!providerId) {
        error_msg = `Your account is linked to a provider that isn't supported.`
      }

      error_msg = `Votre adresse email (${err.email}) est déjà lié à un compte.<br/><br/>Utiliser le bouton : ${getButtonName(providerId)}`;

    } else {
      error_msg = `Une erreur est survenue...`
    }
    // Handle errors...
    // toast.error(err.message || err.toString());
  } 
};

$: error_msg = '';

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

  .error {
    color: red;
  }
</style>

<hr />
<p>
  <button on:click={() => auth.signInAnonymously()}>
    Me connecter en anonyme
  </button>
</p>
<p>
  <button on:click|preventDefault={loginWithGoogle}>
    Me connecter avec Google
  </button>
</p>
<p>
  <button on:click|preventDefault={loginWithFacebook}>
    Me connecter avec Facebook
  </button>
</p>
{#if error_msg != ''}
  <p class="error">
    {@html error_msg}
  </p>
{/if}
<hr />
