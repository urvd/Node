import { CalculatriceService } from './calculatrice.service';

describe('CalculatriceService', () => {
  let calc: CalculatriceService;
  const saisir = (s: string) => [...s].forEach((c) => calc.chiffre(c));

  beforeEach(() => (calc = new CalculatriceService()));

  it('affiche 0 au départ', () => {
    expect(calc.affichage()).toBe('0');
  });

  it('additionne et affiche avec une virgule', () => {
    saisir('1.5');
    calc.operation('+');
    saisir('2');
    calc.egal();
    expect(calc.affichage()).toBe('3,5');
  });

  it('enchaîne les opérations', () => {
    saisir('2');
    calc.operation('+');
    saisir('3');
    calc.operation('*');
    expect(calc.affichage()).toBe('5');
    expect(calc.operationEnCours()).toBe('5 ×');
    saisir('4');
    calc.egal();
    expect(calc.affichage()).toBe('20');
  });

  it('affiche Erreur pour une division par zéro', () => {
    saisir('8');
    calc.operation('/');
    saisir('0');
    calc.egal();
    expect(calc.affichage()).toBe('Erreur');
  });

  it('gère la mémoire', () => {
    saisir('7');
    calc.memoirePlus();
    expect(calc.memoireActive()).toBeTrue();
    calc.effacer();
    calc.memoireRappel();
    expect(calc.affichage()).toBe('7');
  });

  it('calcule racine, carré, inverse et pourcentage', () => {
    saisir('9');
    calc.racine();
    expect(calc.affichage()).toBe('3');
    calc.carre();
    expect(calc.affichage()).toBe('9');
    saisir('4');
    calc.inverse();
    expect(calc.affichage()).toBe('0,25');
    saisir('50');
    calc.pourcentage();
    expect(calc.affichage()).toBe('0,5');
  });

  it('change le signe et saisit un exposant', () => {
    saisir('5');
    calc.changerSigne();
    expect(calc.affichage()).toBe('−5');
    calc.effacer();
    saisir('2');
    calc.exposant();
    saisir('3');
    calc.operation('+');
    expect(calc.affichage()).toBe('2000');
  });
});
