import { ActionType } from '../action/ActionType';
import { CommunException } from '../commun/erreur/CommunException';
import { ErrorType } from '../commun/erreur/ErrorType';
import { IAffichage } from './IAffichage';

export class Affichage implements IAffichage {

    constructor(private readonly sortie: NodeJS.WritableStream = process.stdout) {}

    commencer(): void {
        this.afficher('=== Calculateur ===');
        this.afficher("Saisissez une opération (ex : 3 + 4), ou 'q' pour quitter ou 'r' "
            + 'pour reutilisé le resultat dans un calcul.');
        this.afficher("choisir l'operande parmis : '+', '-', 'x,', '/'");
    }

    terminer(): void {
        this.afficher('Fin du calcul ! Fin du programme !');
    }

    afficher(texte: string): void {
        this.sortie.write(texte + '\n');
    }

    verifierActionUser(ligne: string): ActionType {
        // Vérifier le caractère d'annulation.
        switch (ligne.toLowerCase()) {
            case 'q':
                return ActionType.QUITTER;
            case 's':
            case 'r':
                return ActionType.RE_CALCULER;
            default:
                return ActionType.CALCULER;
        }
    }

    verifierFormatOk(ligne: string): boolean {
        const parties = ligne.split(/\s+/);

        if (parties.length === 3 || parties.length === 2) {
            return true;
        }
        throw new CommunException(ErrorType.FORMAT_ERROR, new Error('Format incorrect : ' + ligne));
    }
}
