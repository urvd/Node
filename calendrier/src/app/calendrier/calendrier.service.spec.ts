import { CalendrierService, semaineIso } from './calendrier.service';

describe('semaineIso', () => {
  it('suit la norme ISO 8601', () => {
    expect(semaineIso({ y: 2026, m: 0, d: 1 })).toBe(1);
    expect(semaineIso({ y: 2026, m: 10, d: 17 })).toBe(47);
    expect(semaineIso({ y: 2027, m: 0, d: 1 })).toBe(53);
  });
});

describe('CalendrierService', () => {
  let cal: CalendrierService;

  beforeEach(() => {
    cal = new CalendrierService();
    cal.aujourdhui.set({ y: 2026, m: 10, d: 17 });
    cal.allerAujourdhui();
  });

  it('affiche 42 jours en commençant par un lundi', () => {
    const cellules = cal.cellules();
    expect(cellules.length).toBe(42);
    // Novembre 2026 commence un dimanche : la grille débute le lundi 26 octobre
    expect(cellules[0].date).toEqual({ y: 2026, m: 9, d: 26 });
    expect(cellules[6].date).toEqual({ y: 2026, m: 10, d: 1 });
    expect(cellules.filter((c) => c.aujourdhui).length).toBe(1);
  });

  it('passe d’un mois à l’autre, y compris d’une année à l’autre', () => {
    cal.choisirMois(11);
    cal.suivant();
    expect(cal.titre()).toBe('Janvier 2027');
    cal.precedent();
    expect(cal.titre()).toBe('Décembre 2026');
  });

  it('enchaîne les vues jours → mois → années → jours', () => {
    cal.changerMode();
    expect(cal.titre()).toBe('2026');
    cal.changerMode();
    expect(cal.titre()).toBe('2021 – 2031');
    expect(cal.precedentDesactive()).toBeTrue();
    cal.changerMode();
    expect(cal.mode()).toBe('jours');
  });

  it('bloque la navigation hors de la plage de ± 5 ans', () => {
    cal.choisirAnnee(2031);
    cal.choisirMois(11);
    expect(cal.suivantDesactive()).toBeTrue();
    cal.suivant();
    expect(cal.titre()).toBe('Décembre 2031');
  });

  it('résume la sélection', () => {
    expect(cal.selectionLongue()).toBe('Mardi 17 novembre 2026');
    expect(cal.selectionInfos()).toBe('SEMAINE 47 · AUJOURD’HUI');
    cal.choisirJour({ y: 2026, m: 10, d: 20 });
    expect(cal.selectionInfos()).toBe('SEMAINE 47 · DANS 3 JOURS');
    cal.choisirJour({ y: 2026, m: 10, d: 16 });
    expect(cal.selectionInfos()).toBe('SEMAINE 47 · HIER');
  });
});
