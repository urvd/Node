import { OperateurType } from './OperateurType';

export class Operation {
    constructor(
        public readonly operande1: number = 0,
        public readonly operande2: number = 0,
        public readonly operateur: OperateurType = OperateurType.ADDITION,
    ) {}
}
