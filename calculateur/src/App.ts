#!/usr/bin/env node
import { createInterface } from 'node:readline';

import { ActionType } from './core/action/ActionType';
import { Affichage } from './core/affichage/Affichage';
import { IAffichage } from './core/affichage/IAffichage';
import { Calculateur } from './core/calcul/Calculateur';
import { ICalcul } from './core/calcul/ICalcul';
import { rechercheOperateur } from './core/calcul/OperateurType';
import { Operation } from './core/calcul/Operation';
import { convertirEnNombre, formaterNombre } from './core/commun/FormatUtils';
import { CommunException } from './core/commun/erreur/CommunException';
import { getMessage } from './core/commun/erreur/ErrorType';
import { Resultat } from './core/resultat/Resultat';

/**
 * Point d'entrée : calculateur interactif en ligne de commande.
 */
export async function main(
    entree: NodeJS.ReadableStream = process.stdin,
    sortie: NodeJS.WritableStream = process.stdout,
): Promise<void> {
    const calculateur: ICalcul = new Calculateur();
    const affichage: IAffichage = new Affichage(sortie);
    let currentAction = ActionType.INITIALISATION;
    let operation: Operation;
    const resultat0 = new Resultat(0.0, false);
    let resultatActual = new Resultat(0.0, false);

    const lecteur = createInterface({ input: entree, terminal: false });

    // 1er affichage avant saisie
    const afficherInvite = (): void => {
        if (currentAction === ActionType.RE_CALCULER) {
            affichage.afficher('Saisir (' + formaterNombre(resultatActual.valeur) + ') >');
        } else {
            if (currentAction === ActionType.INITIALISATION) resultatActual = resultat0;
            affichage.afficher('Saisir > ');
        }
    };

    affichage.commencer();
    afficherInvite();

    // Detection d'une saisie
    for await (const saisie of lecteur) {
        try {
            const ligne = saisie.trim();
            const parties = ligne.split(/\s+/);
            affichage.afficher('[' + parties.join(', ') + ']');
            // Vérification de l'action de l'utilisateur - cas d'annulation ou de recalcul
            currentAction = affichage.verifierActionUser(ligne);
            if (currentAction === ActionType.QUITTER) break;

            // 'r' ou 's' : pas de calcul, la prochaine saisie réutilise le résultat
            if (currentAction === ActionType.SAUVEGUARDER
                || currentAction === ActionType.RE_CALCULER) {
                currentAction = ActionType.RE_CALCULER;
                continue;
            }

            if (!affichage.verifierFormatOk(ligne)) {
                continue;
            }

            // Convertion en operation
            if (parties.length === 2) {
                operation = creerOperationAvecResultat(parties, resultatActual.valeur);
            } else {
                operation = creerOperation(parties);
            }

            // Calcul
            resultatActual = calculateur.calculer(operation);

            affichage.afficher('Resultat =  {' + formaterNombre(resultatActual.valeur) + '}');

        } catch (e) {
            if (!(e instanceof CommunException)) throw e;
            affichage.afficher(getMessage(e.getErrorType()));
        } finally {
            if (currentAction !== ActionType.QUITTER) afficherInvite();
        }
    }
    lecteur.close();
    affichage.terminer();
}

function creerOperationAvecResultat(parties: string[], exValeur: number): Operation {
    return new Operation(exValeur,
        convertirEnNombre(parties[1]),
        rechercheOperateur(parties[0]));
}

function creerOperation(parties: string[]): Operation {
    return new Operation(convertirEnNombre(parties[0]),
        convertirEnNombre(parties[2]),
        rechercheOperateur(parties[1]));
}

if (require.main === module) {
    main().catch((e) => {
        console.error(e);
        process.exit(1);
    });
}
