[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/) [![Build Status](https://dev.azure.com/gillescruchon/my-bad/_apis/build/status/gcruchon.my-bad?branchName=main)](https://dev.azure.com/gillescruchon/my-bad/_build/latest?definitionId=1&branchName=main)

# My bad

## A propos

Ce jeu vise à partager, au sein d'un équipe, les notions d'erreur, faute et échec.

Le jeu est UP & Running à cette adresse (infra de test) : [https://my-bad-game.web.app/](https://my-bad-game.web.app/).

## Développez

### Configurer le projet pour le faire tourner localement

```sh
npm install
cp src/config/firebaseConfig-sample.js src/config/firebaseConfig.js 
```

Dans le fichier `src/config/firebaseConfig.js`, mettre les bonnes valeurs pour les clés suivantes du projet.
Pour cela:

- Allez sur la console firebase
- Sélectionnez votre projet
- Cliquez sur "Paramètre du projet"
- Dans "Paramètres généraux", rubrique "Vos applications", sous-rubrique "Installation et configuration du SDK", copier coller le code "JSON" correpondant à vos paramètres".

### Installer le client firebase

```sh
brew install firebase-cli
```

## Licence

Ce jeu écrit par [Gilles CRUCHON](https://github.com/gcruchon/) est sous licence [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)

<p><a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blanck"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" height="22" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" /> <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" height="22" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" /> <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" height="22" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" /> <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" height="22" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" /></a></p>

## Sources d'inspiration

- [Build a “Kahoot!” Clone with AngularJS and Firebase](https://medium.com/@rotemtam/build-a-kahoot-clone-with-angularjs-and-firebase-b8b30891d968)
- [SvelteFire template](https://github.com/codediodeio/sveltefire-template)

## Librairies tierces

- [Open Iconic](www.useiconic.com/open)
