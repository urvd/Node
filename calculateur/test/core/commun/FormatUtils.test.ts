import { convertirEnNombre, formaterNombre } from '../../../src/core/commun/FormatUtils';
import { CommunException } from '../../../src/core/commun/erreur/CommunException';
import { ErrorType } from '../../../src/core/commun/erreur/ErrorType';

function erreurDe(fn: () => unknown): CommunException {
    try {
        fn();
    } catch (e) {
        if (e instanceof CommunException) return e;
        throw e;
    }
    throw new Error('Aucune exception levée');
}

describe('FormatUtils.convertirEnNombre', () => {
    test('convertir entier', () => expect(convertirEnNombre('42')).toBe(42));
    test('convertir nombre décimal', () => expect(convertirEnNombre('3.5')).toBe(3.5));
    test('convertir nombre négatif', () => expect(convertirEnNombre('-7')).toBe(-7));
    test('convertir zéro', () => expect(convertirEnNombre('0')).toBe(0));
    test('convertir notation scientifique', () => expect(convertirEnNombre('1.5e3')).toBe(1500));
    test('convertir avec espaces autour', () => expect(convertirEnNombre(' 12 ')).toBe(12));

    /** Exception centralisée
     * Test : les saisies non numériques donnent une NUMBER_FORMAT_ERROR.
     */
    test.each([
        ['texte non numérique', 'abc'],
        ['virgule décimale', '3,5'],
        ["opérateur au lieu d'un nombre", '+'],
        ['texte vide', ''],
    ])('%s', (_cas, texte) => {
        expect(erreurDe(() => convertirEnNombre(texte)).getErrorType()).toBe(ErrorType.NUMBER_FORMAT_ERROR);
    });

    /**
     * Comportement actuel : null n'est pas converti en CommunException,
     * la TypeError remonte telle quelle (équivalent de la NullPointerException Java).
     */
    test('texte null', () => {
        expect(() => convertirEnNombre(null as unknown as string)).toThrow(TypeError);
    });
});

describe('FormatUtils.formaterNombre', () => {
    test('entier affiché comme un double Java', () => expect(formaterNombre(5)).toBe('5.0'));
    test('décimal inchangé', () => expect(formaterNombre(2.5)).toBe('2.5'));
});
