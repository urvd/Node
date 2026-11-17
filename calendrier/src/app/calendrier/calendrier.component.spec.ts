import { TestBed } from '@angular/core/testing';
import { CalendrierComponent } from './calendrier.component';

describe('CalendrierComponent', () => {
  it('affiche 42 jours, puis 12 mois et 11 années', () => {
    const fixture = TestBed.createComponent(CalendrierComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelectorAll('.jour').length).toBe(42);
    expect(el.querySelectorAll('.jour--aujourdhui').length).toBe(1);

    const titre = el.querySelector('.titre') as HTMLButtonElement;
    titre.click();
    fixture.detectChanges();
    expect(el.querySelectorAll('.choix').length).toBe(12);

    titre.click();
    fixture.detectChanges();
    expect(el.querySelectorAll('.choix').length).toBe(11);
  });
});
