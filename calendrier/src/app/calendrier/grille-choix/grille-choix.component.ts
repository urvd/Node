import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Choix } from '../calendrier.service';

/** Grille de 3 colonnes pour choisir un mois ou une année. */
@Component({
  selector: 'app-grille-choix',
  templateUrl: './grille-choix.component.html',
  styleUrl: './grille-choix.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrilleChoixComponent {
  readonly elements = input.required<Choix[]>();
  readonly variante = input<'mois' | 'annees'>('mois');
  readonly choix = output<number>();
}
