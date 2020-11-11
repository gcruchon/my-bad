<script>
  import { FirebaseApp, User } from 'sveltefire';
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import 'firebase/auth';
  import 'firebase/performance';
  import 'firebase/analytics';

  import firebaseConfig from './config/firebaseConfig';

  import Routes from './Routes.svelte';
  import ShowUser from './components/user/ShowUser.svelte';
  import SignIn from './components/user/SignIn.svelte';
  import Title from './components/shared/Title.svelte';
  import Footer from './components/shared/Footer.svelte';

  firebase.initializeApp(firebaseConfig);
</script>

<!-- Styles -->
<style>
  main {
    padding: 0 1.5em;
  }
  :global(.error) {
    color: purple;
    font-weight: bold;
  }
  :global(.mistake) {
    color: orangered;
    font-weight: bold;
  }
  :global(.failure) {
    color: olive;
    font-weight: bold;
  }
</style>

{#if !firebaseConfig.projectId}<strong>Please check your config...</strong>{/if}
<FirebaseApp {firebase}>
  <User persist={sessionStorage} let:user let:auth>
    <ShowUser {user} {auth} />

    <main>
      <Title />

      <Routes userId={user.uid} />
    </main>

    <div slot="signed-out">
      <main>
        <Title />
        <SignIn {auth} {firebase} />
      </main>
    </div>
  </User>
</FirebaseApp>
<Footer />
