import { CommunException } from './erreur/CommunException';
import { ErrorType } from './erreur/ErrorType';

// Même grammaire que Double.parseDouble en Java (forme décimale) : "42", "-7", "3.5", "1.5e3"
const NOMBRE = /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/;

export function convertirEnNombre(texte: string): number {
    const valeur = texte.trim();
    if (!NOMBRE.test(valeur)) {
        throw new CommunException(ErrorType.NUMBER_FORMAT_ERROR, new Error('Nombre invalide : "' + texte + '"'));
    }
    return Number(valeur);
}

/**
 * Affiche un nombre comme Java le fait pour un double (ex : 5 -> "5.0").
 */
export function formaterNombre(valeur: number): string {
    return Number.isInteger(valeur) ? valeur.toFixed(1) : String(valeur);
}
