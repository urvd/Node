# Object : Projet Node en TypeScript, pour simuler le comportement d'une calculatrice simple
> [!NOTE]
> ### Technos : Node.js (>= 18), TypeScript 5, Jest, Stryker.

Portage du projet Maven `calculateur` (Java 17) : même découpage en modules
(`core/action`, `core/affichage`, `core/calcul`, `core/commun`, `core/resultat`) et même comportement.

## Utilisation

* `2 + 3` : calcule l'opération (opérateurs `+`, `-`, `*` ou `x`, `/`).
* `r` ou `s` : réutilise le dernier résultat, puis saisir par ex. `+ 4`.
* `q` : quitte le programme.

## Info utiles :

### Lancer un programme :

#### Exemple 1 :
* `cd calculateur`
* `npm install`
* `npm run build`
* `npm start`

#### Exemple 2 :
Sans compilation préalable : `npm run dev` (via ts-node), ou depuis VSCode / WebStorm lancer `src/App.ts`.

### Lancer des tests et ouvrir les rapports sur un navigateur par défaut :

* `npm test`
* `npm run test:coverage` puis `open coverage/index.html` (équivalent JaCoCo)
* `npm run test:mutation` puis `open reports/mutation/index.html` (équivalent PIT)

### Analyse automatique à chaque push (GitHub Actions)

Le workflow `.github/workflows/analyse-push.yml` se déclenche à chaque push du propriétaire du dépôt, sur toutes les branches :

1. lancement du projet (`npm run build` puis `npm start`) ;
2. qualité du code (`npm run lint` avec ESLint, `npm run typecheck`) ;
3. tests unitaires avec couverture (`npm run test:coverage`) ;
4. vulnérabilités (`npm audit` et OSV-Scanner) ;
5. axes d'amélioration rédigés par Claude, publiés en commentaire du commit
   (nécessite le secret `ANTHROPIC_API_KEY` dans Settings > Secrets and variables > Actions).

Après un merge, l'analyse n'est lancée que s'il y a des différences avec la branche qui reçoit le merge.
