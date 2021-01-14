<script>
  import {
    EVENT_LOGIN_ANONYMOUS,
    EVENT_LOGIN_FACEBOOK,
    EVENT_LOGIN_FAILED,
    EVENT_LOGIN_GOOGLE,
    logEvent,
  } from '../../analytics';

  import authConfig from '../../config/authConfig';

  export let auth;
  export let firebase;

  const loginWithGoogle = async () => {
    try {
      logEvent(firebase, EVENT_LOGIN_GOOGLE);
      const google = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(google);
    } catch (err) {
      logEvent(firebase, EVENT_LOGIN_FAILED);
      error_msg = `Une erreur est survenue...`;
    }
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

  const loginAnonymously = async () => {
    try {
      firebase.analytics().logEvent('login', { method: 'Anonymous' });
      logEvent(firebase, EVENT_LOGIN_ANONYMOUS);
      return await auth.signInAnonymously();
    } catch (err) {
      logEvent(firebase, EVENT_LOGIN_FAILED);
      error_msg = `Une erreur est survenue...`;
    }
  };

  const loginWithFacebook = async () => {
    logEvent(firebase, EVENT_LOGIN_FACEBOOK);
    const facebook = new firebase.auth.FacebookAuthProvider();
    try {
      await auth.signInWithPopup(facebook);
    } catch (err) {
      logEvent(firebase, EVENT_LOGIN_FAILED);
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
    }
  };

  $: error_msg = '';
</script>

<div class="alert alert-info my-5" role="alert">
  <p>
    Vous souhaitez démarrer une partie ? Que vous en soyez l'animateur•trice ou
    un•e joueur•euse, vous devez vous connecter.
  </p>
  {#if authConfig.anonymous && !authConfig.google && !authConfig.facebook}
    {#if authConfig.google || authConfig.facebook}
      <p>
        Si vous ne souhaitez pas laisser de trace, choisissez "Me connecter en
        anonyme".
      </p>
    {:else}
      <p>Veuillez cliquer sur "Me connecter en anonyme".</p>
    {/if}
  {/if}
  {#if authConfig.google && authConfig.facebook}
    <p>
      Si vous souhaitez pouvoir retrouver vos parties, alors choisissez "Me
      connecter avec Google" ou "Me connecter avec Facebook".
    </p>
  {/if}
  {#if authConfig.google && !authConfig.facebook}
    <p>
      Si vous souhaitez pouvoir retrouver vos parties, alors choisissez "Me
      connecter avec Google".
    </p>
  {/if}
  {#if !authConfig.google && authConfig.facebook}
    <p>
      Si vous souhaitez pouvoir retrouver vos parties, alors choisissez "Me
      connecter avec Facebook".
    </p>
  {/if}
</div>
{#if authConfig.anonymous}
  <button
    class="btn btn-success btn-lg btn-block text-center"
    on:click|preventDefault={async () => await loginAnonymously()}
  >Me connecter en anonyme</button>
{/if}
{#if authConfig.google}
  <button
    class="btn btn-primary btn-lg btn-block text-center"
    on:click|preventDefault={async () => await loginWithGoogle()}
  >Me connecter avec Google</button>
{/if}
{#if authConfig.facebook}
  <button
    class="btn btn-primary btn-lg btn-block text-center"
    on:click|preventDefault={async () => await loginWithFacebook()}
  >Me connecter avec Facebook</button>
{/if}
{#if error_msg != ''}
  <p class="alert alert-danger my-5 text-center">
    {@html error_msg}
  </p>
{/if}
<p class="alert alert-secondary my-5 text-center" role="alert">
  Aucune donnée personnelle n'est stockée ! Plus de détails ici :
  <a href="https://firebase.google.com/support/privacy">
    https://firebase.google.com/support/privacy
  </a>
  .
</p>
