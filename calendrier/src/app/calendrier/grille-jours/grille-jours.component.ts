import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Cellule, JourCalendrier } from '../calendrier.service';

/** La grille du mois : en-têtes LUN à DIM et 42 jours. */
@Component({
  selector: 'app-grille-jours',
  templateUrl: './grille-jours.component.html',
  styleUrl: './grille-jours.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrilleJoursComponent {
  readonly cellules = input.required<Cellule[]>();
  readonly choix = output<JourCalendrier>();
  protected readonly joursSemaine = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
}
