import { Resultat } from '../resultat/Resultat';
import { Operation } from './Operation';

export interface ICalcul {
    /** @throws CommunException */
    calculer(operation: Operation): Resultat;
}
