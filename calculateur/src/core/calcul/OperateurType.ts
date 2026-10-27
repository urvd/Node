export enum OperateurType {
    ADDITION = '+',
    SOUSTRACTION = '-',
    MULTIPLICATION = '*',
    MULTIPLICATION_X = 'x',
    DIVISION = '/',
    NOT_AN_OPERATEUR = '',
}

export function rechercheOperateur(symbole: string): OperateurType {
    for (const operateur of Object.values(OperateurType)) {
        if (operateur === symbole) {
            return operateur;
        }
    }
    return OperateurType.NOT_AN_OPERATEUR;
}
