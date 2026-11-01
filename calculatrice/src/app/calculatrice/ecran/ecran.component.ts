import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** L'écran : valeur courante, opération en attente et indicateur de mémoire. */
@Component({
  selector: 'app-ecran',
  templateUrl: './ecran.component.html',
  styleUrl: './ecran.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcranComponent {
  readonly valeur = input.required<string>();
  readonly operationEnCours = input('');
  readonly memoireActive = input(false);

  /** Réduit la taille du chiffre quand la valeur s'allonge. */
  readonly taille = computed(() => {
    const n = this.valeur().length;
    return n > 11 ? 'petit' : n > 8 ? 'moyen' : 'grand';
  });
}
