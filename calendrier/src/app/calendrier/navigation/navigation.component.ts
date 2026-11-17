import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/** Flèche précédente, titre cliquable (change de vue), flèche suivante. */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  readonly titre = input.required<string>();
  readonly titreAccessible = input.required<string>();
  readonly chevron = input(true);
  readonly precedentDesactive = input(false);
  readonly suivantDesactive = input(false);
  readonly libellePrecedent = input('Mois précédent');
  readonly libelleSuivant = input('Mois suivant');

  readonly precedent = output<void>();
  readonly suivant = output<void>();
  readonly titreClic = output<void>();
}
