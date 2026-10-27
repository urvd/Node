import { Calculateur } from '../../../src/core/calcul/Calculateur';
import { ICalcul } from '../../../src/core/calcul/ICalcul';
import { OperateurType, rechercheOperateur } from '../../../src/core/calcul/OperateurType';
import { Operation } from '../../../src/core/calcul/Operation';
import { CommunException } from '../../../src/core/commun/erreur/CommunException';

describe('Calculateur', () => {
    const calculateur: ICalcul = new Calculateur();

    test('additionner', () => {
        const resultat = calculateur.calculer(new Operation(3, 4, OperateurType.ADDITION));
        expect(resultat.valeur).toBe(7);
    });

    test('soustraire', () => {
        const resultat = calculateur.calculer(new Operation(3, 4, OperateurType.SOUSTRACTION));
        expect(resultat.valeur).toBe(-1);
    });

    test('multiplier', () => {
        const resultat = calculateur.calculer(new Operation(3, 4, OperateurType.MULTIPLICATION));
        expect(resultat.valeur).toBe(12);
    });

    test('calculer autre operateur multiplication', () => {
        const resultat = calculateur.calculer(new Operation(3, 3, OperateurType.MULTIPLICATION_X));
        expect(resultat.valeur).toBe(9);
    });

    test('diviser', () => {
        const resultat = calculateur.calculer(new Operation(5, 2, OperateurType.DIVISION));
        expect(resultat.valeur).toBe(2.5);
    });

    /** Exception centralisée
     * Test : la division par zéro et l'opérateur inconnu.
     */
    test('diviser par zero', () => {
        expect(() => calculateur.calculer(new Operation(1, 0, OperateurType.DIVISION)))
            .toThrow(CommunException);
    });

    test('operateur inconnu', () => {
        expect(() => calculateur.calculer(new Operation(1, 2, rechercheOperateur('_'))))
            .toThrow(CommunException);
    });
});
