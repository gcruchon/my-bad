<script>
  import { getContext } from "svelte";
  import { hasGamesInProgress, cleanUpUser } from "./user";

  export let user;
  export let auth;

  const app = getContext("firebase").getFirebase();
  const db = app.firestore();

  const signOut = async (db, userId, auth) => {
    const hasGames = await hasGamesInProgress(db, userId);
    let shouldPerformSignOut = true;
    if (hasGames) {
      if (
        !confirm(
          "Vous avez un ou plusieurs jeux en cours.\n\nEn vous déconnectant, vous ne serez plus capable d'y jouer.\n\nCliquez sur 'OK' pour vous déconnecter."
        )
      ) {
        shouldPerformSignOut = false;
      }
    }
    if (shouldPerformSignOut) {
      await cleanUpUser(db, userId);
      auth.signOut();
    }
  };
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
  Salut, utilisateur
  <em>{user.uid}</em>
  !
  <button on:click={() => signOut(db, user.uid, auth)}>Me déconnecter</button>
</p>

<hr />
