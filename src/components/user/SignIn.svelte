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
        return 'Me connecter avec Google';
      case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
        return 'Me connecter avec Facebook';
      default:
        throw new Error(`No provider implemented for ${providerId}`);
    }
  }

  const loginWithFacebook = async () => {
    const facebook = new firebase.auth.FacebookAuthProvider();
    try {
      await auth.signInWithPopup(facebook);
    } catch (err) {
      if (
        err.email &&
        err.credential &&
        err.code === 'auth/account-exists-with-different-credential'
      ) {
        const providers = await firebase
          .auth()
          .fetchSignInMethodsForEmail(err.email);
        const providerId = providers.find(p => supportedProviders.includes(p));

        if (!providerId) {
          error_msg = `Your account is linked to a provider that isn't supported.`;
        }

        error_msg = `Votre adresse email (${
          err.email
        }) est déjà lié à un compte.<br/><br/>Utiliser le bouton : ${getButtonName(
          providerId,
        )}`;
      } else {
        error_msg = `Une erreur est survenue...`;
      }
      // Handle errors...
      // toast.error(err.message || err.toString());
    }
  };

  $: error_msg = '';
</script>

<div class="alert alert-info my-5" role="alert">
  <p>
    Vous souhaitez démarrer une partie ? Que vous en soyez l'animateur•trice ou
    un•e joueur•euse, vous devez vous connecter.
  </p>
  <p>
    Si vous ne souhaitez pas laisser de trace, choisissez "Me connecter en
    anonyme".
  </p>
  <p>
    Si vous souhaitez pouvoir retrouver vos parties, alors choisissez "Me
    connecter avec Google" ou "Me connecter avec Facebook".
  </p>
</div>
<button
  class="btn btn-success btn-lg btn-block text-center"
  on:click|preventDefault={() => auth.signInAnonymously()}>
  Me connecter en anonyme
</button>
<button
  class="btn btn-primary btn-lg btn-block text-center"
  on:click|preventDefault={loginWithGoogle}>
  Me connecter avec Google
</button>
<button
  class="btn btn-primary btn-lg btn-block text-center"
  on:click|preventDefault={loginWithFacebook}>
  Me connecter avec Facebook
</button>
{#if error_msg != ''}
  <p class="alert alert-danger">
    {@html error_msg}
  </p>
{/if}
<p class="alert alert-secondary my-5 text-center" role="alert">
  Aucune donnée personnelle n'est stockée ! Plus de détails ici :
  <a
    href="https://firebase.google.com/support/privacy">https://firebase.google.com/support/privacy</a>.
</p>
