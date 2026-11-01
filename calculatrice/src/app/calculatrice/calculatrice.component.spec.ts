import { TestBed } from '@angular/core/testing';
import { CalculatriceComponent } from './calculatrice.component';

describe('CalculatriceComponent', () => {
  const appuyer = (el: HTMLElement, libelle: string) => {
    const bouton = [...el.querySelectorAll('button')].find(
      (b) => b.getAttribute('aria-label') === libelle || b.textContent?.trim() === libelle,
    );
    if (!bouton) throw new Error(`Touche introuvable : ${libelle}`);
    bouton.click();
  };

  it('affiche 26 touches et calcule 7 × 6 = 42', () => {
    const fixture = TestBed.createComponent(CalculatriceComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('button').length).toBe(26);

    appuyer(el, '7');
    appuyer(el, 'Multiplier');
    appuyer(el, '6');
    appuyer(el, 'Égal');
    fixture.detectChanges();

    expect(el.querySelector('.ecran__valeur')?.textContent?.trim()).toBe('42');
  });
});
