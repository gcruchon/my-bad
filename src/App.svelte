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
  :global(.btn .oi) {
    padding-right: .3em;
  }
</style>

{#if !firebaseConfig.projectId}<strong>Please check your config...</strong>{/if}
<FirebaseApp {firebase} perf analytics>
  <User persist={sessionStorage} let:user let:auth>
    <ShowUser {user} {auth} />

    <main class="container">
      <Title />

      <Routes userId={user.uid} />
    </main>

    <div slot="signed-out">
      <main class="container">
        <Title />
        <SignIn {auth} {firebase} />
      </main>
    </div>
  </User>
</FirebaseApp>
<Footer />
