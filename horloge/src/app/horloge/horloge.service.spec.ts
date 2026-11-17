import { TestBed } from '@angular/core/testing';
import { HorlogeService, deuxChiffres, heureDans } from './horloge.service';

describe('heureDans', () => {
  const instant = new Date(Date.UTC(2026, 0, 15, 12, 34, 56));

  it('donne l’heure d’un fuseau précis', () => {
    expect(heureDans(instant, 'Asia/Tokyo')).toEqual({ h: 21, m: 34, s: 56 });
    expect(heureDans(instant, 'America/New_York')).toEqual({ h: 7, m: 34, s: 56 });
  });

  it('retombe sur l’heure locale pour un fuseau inconnu', () => {
    expect(heureDans(instant, 'Pas/Un_Fuseau')).toEqual({
      h: instant.getHours(), m: instant.getMinutes(), s: instant.getSeconds(),
    });
  });

  it('complète à deux chiffres', () => {
    expect(deuxChiffres(7)).toBe('07');
    expect(deuxChiffres(42)).toBe('42');
  });
});

describe('HorlogeService', () => {
  let horloge: HorlogeService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HorlogeService] });
    horloge = TestBed.inject(HorlogeService);
  });

  it('bascule entre analogique et numérique', () => {
    expect(horloge.numerique()).toBeFalse();
    horloge.basculerAffichage();
    expect(horloge.numerique()).toBeTrue();
  });

  it('ferme le sélecteur quand un fuseau est choisi', () => {
    horloge.basculerSelecteur();
    expect(horloge.selecteurOuvert()).toBeTrue();
    horloge.choisirFuseau('Asia/Tokyo');
    expect(horloge.selecteurOuvert()).toBeFalse();
    expect(horloge.libelleFuseau()).toContain('TOKYO');
  });

  it('écrit la date en français avec une majuscule', () => {
    horloge.maintenant.set(new Date(2026, 10, 17, 10, 0, 0));
    expect(horloge.dateLongue()).toBe('Mardi 17 novembre 2026');
  });
});
