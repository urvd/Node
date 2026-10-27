import { PassThrough, Readable } from 'node:stream';

import { main } from '../src/App';

/**
 * Test de bout en bout : simule une saisie utilisateur et lit l'affichage.
 */
async function lancer(saisie: string): Promise<string> {
    const sortie = new PassThrough();
    let affichage = '';
    sortie.on('data', (morceau) => { affichage += morceau.toString(); });
    await main(Readable.from([saisie]), sortie);
    return affichage;
}

describe('App', () => {
    test('recalculer avec r', async () => {
        const affichage = await lancer('2 + 3\nr\n+ 4\nq\n');

        expect(affichage).not.toContain('Format de saisie incorrect');
        expect(affichage).toContain('Saisir (5.0) >');
        expect(affichage).toContain('Resultat =  {9.0}');
    });

    test('recalculer avec s', async () => {
        const affichage = await lancer('2 + 3\ns\n* 2\nq\n');

        expect(affichage).not.toContain('Format de saisie incorrect');
        expect(affichage).toContain('Saisir (5.0) >');
        expect(affichage).toContain('Resultat =  {10.0}');
    });

    test('format incorrect', async () => {
        const affichage = await lancer('2\nq\n');

        expect(affichage).toContain('Format de saisie incorrect');
    });

    test('fin de saisie sans quitter', async () => {
        const affichage = await lancer('2 + 3\n');

        expect(affichage).toContain('Resultat =  {5.0}');
        expect(affichage).toContain('Fin du programme');
    });
});
