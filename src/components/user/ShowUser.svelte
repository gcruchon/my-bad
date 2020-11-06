<script>
  import { getContext } from "svelte";
  import { navigate } from "svelte-routing";
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
      await auth.signOut();
      navigate("/");
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
    text-align: right;
    margin: 0;
    background-color: #dddddd;
    padding: 0.8em 0.5em 0.5em 0.5em;
  }
  em {
    font-size: 60%;
    color: #555;
  }
</style>

<p>
  Salut,
  {#if user.isAnonymous}
    cher.e Anonyme !
    <em>({user.uid})</em>
  {:else}{user.displayName} !{/if}
  <button on:click={() => signOut(db, user.uid, auth)}>Me déconnecter</button>
</p>