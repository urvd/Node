import { ActionType } from '../../../src/core/action/ActionType';
import { Affichage } from '../../../src/core/affichage/Affichage';
import { IAffichage } from '../../../src/core/affichage/IAffichage';
import { CommunException } from '../../../src/core/commun/erreur/CommunException';

describe('Affichage', () => {
    const affichage: IAffichage = new Affichage();
    const TEXTE_ANNULATION = 'q';
    const TEXTE_RECALCULER = 'r';
    const TEXTE_CALCULER = 'c';
    const TEXTE_AUTRE = 'p';
    const TEXTE_FORMAT_OK1 = '3 x 3';
    const TEXTE_FORMAT_OK2 = 'L S U';
    const TEXTE_FORMAT_OK3 = 'L S  U';
    const TEXTE_FORMAT_STR0 = ' S U';
    const TEXTE_FORMAT_STR1 = 'LSU';
    const TEXTE_FORMAT_STR2 = 'L';
    const TEXTE_FORMAT_STR3 = '45-79';

    test('verification annulation', () => {
        expect(affichage.verifierActionUser(TEXTE_ANNULATION)).toBe(ActionType.QUITTER);
    });

    test('verification calculer', () => {
        expect(affichage.verifierActionUser(TEXTE_CALCULER)).toBe(ActionType.CALCULER);
        expect(affichage.verifierActionUser(TEXTE_AUTRE)).toBe(ActionType.CALCULER);
    });

    test('verification recalculer', () => {
        expect(affichage.verifierActionUser(TEXTE_RECALCULER)).toBe(ActionType.RE_CALCULER);
    });

    test('verification format correct', () => {
        expect(affichage.verifierFormatOk(TEXTE_FORMAT_OK1)).toBe(true);
        expect(affichage.verifierFormatOk(TEXTE_FORMAT_OK2)).toBe(true);
        expect(affichage.verifierFormatOk(TEXTE_FORMAT_OK3)).toBe(true);
        // 2 entités (ex : "+ 4") : format admis pour réutiliser le résultat précédent
        expect(affichage.verifierFormatOk(TEXTE_FORMAT_STR0.trim())).toBe(true);
    });

    test('verification format non correct', () => {
        expect(() => affichage.verifierFormatOk(TEXTE_FORMAT_STR1)).toThrow(CommunException);
        expect(() => affichage.verifierFormatOk(TEXTE_FORMAT_STR2)).toThrow(CommunException);
        expect(() => affichage.verifierFormatOk(TEXTE_FORMAT_STR3)).toThrow(CommunException);
    });
});
