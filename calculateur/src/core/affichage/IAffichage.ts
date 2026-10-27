import { ActionType } from '../action/ActionType';

export interface IAffichage {
    commencer(): void;
    terminer(): void;
    afficher(texte: string): void;
    verifierActionUser(ligne: string): ActionType;
    /** @throws CommunException */
    verifierFormatOk(ligne: string): boolean;
}
