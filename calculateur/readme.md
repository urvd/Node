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
