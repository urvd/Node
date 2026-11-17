import { TestBed } from '@angular/core/testing';
import { HorlogeComponent } from './horloge.component';

describe('HorlogeComponent', () => {
  it('passe du cadran aux tuiles, puis au sélecteur de fuseau', () => {
    const fixture = TestBed.createComponent(HorlogeComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('app-cadran-analogique')).toBeTruthy();

    (el.querySelector('[role="switch"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(el.querySelector('app-affichage-numerique')).toBeTruthy();
    expect(el.querySelectorAll('.tuile').length).toBe(3);

    (el.querySelector('[aria-label="Changer de fuseau horaire"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(el.querySelectorAll('.ville').length).toBe(12);
  });
});
