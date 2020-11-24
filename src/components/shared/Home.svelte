<script>
  import { getContext } from 'svelte';
  import { navitageWithLog } from '../../utils';

  const firebase = getContext('firebase').getFirebase();
</script>

<p class="alert alert-info my-4">
  Ce jeu tout public permet de maîtriser les concepts d'erreur, d'échec et de
  faute. Il permettra également de libérer la parole autour de l'erreur. À jouer
  en équipe !
</p>
<p class="text-center my-3 font-weight-bold">Vous souhaitez ...</p>
<button
  class="btn btn-success btn-lg btn-block py-4 font-weight-bolder"
  on:click={() => navitageWithLog(firebase, '/host')}>
  <span class="oi oi-bullhorn" />
  Animer un jeu
</button>
<button
  class="btn btn-primary btn-lg btn-block py-4 font-weight-bolder"
  on:click={() => navitageWithLog(firebase, '/player')}>
  <span class="oi oi-phone" />
  Rejoindre un jeu existant
</button>
