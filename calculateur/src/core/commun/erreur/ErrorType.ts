export enum ErrorType {
    FORMAT_ERROR = 'FORMAT_ERROR',
    NUMBER_FORMAT_ERROR = 'NUMBER_FORMAT_ERROR',
    ARITHMETIC_ERROR = 'ARITHMETIC_ERROR',
    ARRAY_INDEX_OUT_OF_BOUNDS_ERROR = 'ARRAY_INDEX_OUT_OF_BOUNDS_ERROR',
    ILLEGAL_ARGUMENT_ERROR = 'ILLEGAL_ARGUMENT_ERROR',
    UNDEFINED_ERROR = 'UNDEFINED_ERROR',
}

const MESSAGES: Record<ErrorType, string> = {
    [ErrorType.FORMAT_ERROR]: 'Format de saisie incorrect',
    [ErrorType.NUMBER_FORMAT_ERROR]: 'Erreur de format numérique !',
    [ErrorType.ARITHMETIC_ERROR]: 'Erreur arithmétique !',
    [ErrorType.ARRAY_INDEX_OUT_OF_BOUNDS_ERROR]: 'Saisie invalide !',
    [ErrorType.ILLEGAL_ARGUMENT_ERROR]: 'Argument invalide !',
    [ErrorType.UNDEFINED_ERROR]: 'Erreur indéfinie !',
};

export function getMessage(errorType: ErrorType): string {
    return MESSAGES[errorType];
}
