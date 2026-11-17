import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HeureMinuteSeconde, deuxChiffres } from '../horloge.service';

/** L'heure en trois tuiles : heures, minutes, secondes. */
@Component({
  selector: 'app-affichage-numerique',
  templateUrl: './affichage-numerique.component.html',
  styleUrl: './affichage-numerique.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AffichageNumeriqueComponent {
  readonly heure = input.required<HeureMinuteSeconde>();

  protected readonly tuiles = computed(() => {
    const { h, m, s } = this.heure();
    return [
      { valeur: deuxChiffres(h), libelle: 'HEURES', variante: 'heures' },
      { valeur: deuxChiffres(m), libelle: 'MINUTES', variante: 'minutes' },
      { valeur: deuxChiffres(s), libelle: 'SECONDES', variante: 'secondes' },
    ];
  });

  /** Les deux-points clignotent : pleins les secondes paires. */
  protected readonly separateurAttenue = computed(() => this.heure().s % 2 === 1);
}
