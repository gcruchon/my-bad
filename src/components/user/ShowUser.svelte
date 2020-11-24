<script>
  import { getContext } from 'svelte';
  import { hasGamesInProgress, cleanUpUser } from './user';
  import { navitageWithLog } from '../../utils';
  import { EVENT_LOGOUT, logEvent } from '../../analytics';

  export let user;
  export let auth;

  const firebase = getContext('firebase').getFirebase();
  const db = firebase.firestore();

  const signOut = async (db, userId, auth) => {
    const hasGames = await hasGamesInProgress(db, userId);
    let shouldPerformSignOut = true;
    if (hasGames) {
      if (
        !confirm(
          "Vous avez un ou plusieurs jeux en cours.\n\nEn vous déconnectant, vous ne serez plus capable d'y jouer.\n\nCliquez sur 'OK' pour vous déconnecter.",
        )
      ) {
        shouldPerformSignOut = false;
      }
    }
    if (shouldPerformSignOut) {
      logEvent(firebase, EVENT_LOGOUT);
      await cleanUpUser(db, userId);
      await auth.signOut();
      navitageWithLog(firebase, '/');
    }
  };
</script>

<style>
  p {
    background-color: #dddddd;
  }
  em {
    font-size: 60%;
  }
</style>

<p class="text-right m-0 mb-3 p-2 pt-3">
  Salut,
  {#if user.isAnonymous}
    cher•e Anonyme !
    <em class="text-muted">({user.uid})</em>
  {:else}{user.displayName} !{/if}
  <button
    class="btn btn-outline-secondary"
    on:click={() => signOut(db, user.uid, auth)}>
    <span class="d-inline d-sm-none oi oi-account-logout" />
    <span class="d-none d-sm-inline">Me déconnecter</span>
  </button>
</p>
