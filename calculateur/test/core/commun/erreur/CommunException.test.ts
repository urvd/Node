import { CommunException } from '../../../../src/core/commun/erreur/CommunException';
import { ErrorType } from '../../../../src/core/commun/erreur/ErrorType';

describe('CommunException', () => {
    test('reconnait une erreur de format numérique', () => {
        const exception = new CommunException(ErrorType.NUMBER_FORMAT_ERROR, new Error('nombre invalide'));
        expect(exception.getErrorType()).toBe(ErrorType.NUMBER_FORMAT_ERROR);
    });

    test('reconnait une erreur arithmétique', () => {
        const exception = new CommunException(ErrorType.ARITHMETIC_ERROR, new Error('division par zéro'));
        expect(exception.getErrorType()).toBe(ErrorType.ARITHMETIC_ERROR);
    });

    test('reconnait un index hors limites', () => {
        const exception = new CommunException(ErrorType.ARRAY_INDEX_OUT_OF_BOUNDS_ERROR, new RangeError('5'));
        expect(exception.getErrorType()).toBe(ErrorType.ARRAY_INDEX_OUT_OF_BOUNDS_ERROR);
    });

    test('reconnait un argument invalide', () => {
        const exception = new CommunException(ErrorType.ILLEGAL_ARGUMENT_ERROR, new TypeError('argument invalide'));
        expect(exception.getErrorType()).toBe(ErrorType.ILLEGAL_ARGUMENT_ERROR);
    });

    test('reconnait une autre erreur non prévue', () => {
        const cause = new Error('argument invalide');
        const exception = new CommunException(ErrorType.UNDEFINED_ERROR, cause);
        expect(exception.getErrorType()).toBe(ErrorType.UNDEFINED_ERROR);
        expect(exception.cause).toBe(cause);
    });
});
