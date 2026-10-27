import { CommunException } from '../commun/erreur/CommunException';
import { ErrorType } from '../commun/erreur/ErrorType';
import { Resultat } from '../resultat/Resultat';
import { ICalcul } from './ICalcul';
import { OperateurType } from './OperateurType';
import { Operation } from './Operation';

/**
 * Calculateur simple proposant des opérations.
 */
export class Calculateur implements ICalcul {

    private additionner(a: number, b: number): Resultat {
        return new Resultat(a + b, true);
    }

    private soustraire(a: number, b: number): Resultat {
        return new Resultat(a - b, true);
    }

    private multiplier(a: number, b: number): Resultat {
        return new Resultat(a * b, true);
    }

    private diviser(a: number, b: number): Resultat {
        if (b === 0) {
            throw new CommunException(ErrorType.ARITHMETIC_ERROR, new Error('Division par zéro impossible'));
        }
        return new Resultat(a / b, true);
    }

    /**
     * Applique l'opérateur donné (+, -, * ou x, /) aux deux opérandes.
     */
    calculer(operation: Operation): Resultat {
        switch (operation.operateur) {
            case OperateurType.ADDITION:
                return this.additionner(operation.operande1, operation.operande2);
            case OperateurType.SOUSTRACTION:
                return this.soustraire(operation.operande1, operation.operande2);
            case OperateurType.MULTIPLICATION:
            case OperateurType.MULTIPLICATION_X:
                return this.multiplier(operation.operande1, operation.operande2);
            case OperateurType.DIVISION:
                return this.diviser(operation.operande1, operation.operande2);
            default:
                throw new CommunException(ErrorType.ILLEGAL_ARGUMENT_ERROR,
                    new Error('Opérateur inconnu : ' + operation.operateur));
        }
    }
}
