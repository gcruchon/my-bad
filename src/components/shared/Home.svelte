<script>
  import { navigate } from 'svelte-routing';
</script>

<p class="alert alert-info my-4">
  Ce jeu tout public permet de maîtriser les concepts d'erreur, d'échec et de
  faute. Il permettra également de libérer la parole autour de l'erreur. À jouer
  en équipe !
</p>
<p class="text-center my-3 font-weight-bold">Vous souhaitez ...</p>
<button
  class="btn btn-success btn-lg btn-block py-4 font-weight-bolder"
  on:click={() => navigate('/host')}>
  <span class="oi oi-bullhorn"></span>
  Animer un jeu
</button>
<button
  class="btn btn-primary btn-lg btn-block py-4 font-weight-bolder"
  on:click={() => navigate('/player')}>
  <span class="oi oi-phone"></span>
  Rejoindre un jeu existant
</button>
