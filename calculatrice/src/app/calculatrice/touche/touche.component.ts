import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type VarianteTouche = 'chiffre' | 'fonction' | 'memoire' | 'operateur' | 'effacer' | 'egal';

/** Une touche de la calculatrice ; son libellé est projeté (`<ng-content>`). */
@Component({
  selector: 'app-touche',
  templateUrl: './touche.component.html',
  styleUrl: './touche.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.pleine-largeur]': "variante() === 'egal'" },
})
export class ToucheComponent {
  readonly variante = input.required<VarianteTouche>();
  /** Nom lu par les lecteurs d'écran quand le libellé visible est un symbole. */
  readonly libelleAccessible = input<string | undefined>(undefined);
  readonly appui = output<void>();
}
