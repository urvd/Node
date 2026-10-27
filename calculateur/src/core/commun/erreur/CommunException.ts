import { ErrorType } from './ErrorType';

/**
 * Exception centralisée de l'application : porte le type d'erreur
 * dont le message est affiché à l'utilisateur.
 */
export class CommunException extends Error {
    private errorType: ErrorType;

    constructor(errorType: ErrorType, cause: Error) {
        super('Calcul App Error type - ' + cause.message, { cause });
        this.name = 'CommunException';
        this.errorType = errorType ?? ErrorType.UNDEFINED_ERROR;
    }

    getErrorType(): ErrorType {
        return this.errorType;
    }

    setErrorType(type: ErrorType): void {
        this.errorType = type;
    }
}
