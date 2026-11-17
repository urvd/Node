import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HeureMinuteSeconde } from '../horloge.service';

interface Chiffre {
  texte: string;
  x: number;
  y: number;
  majeur: boolean;
}

const CENTRE = 150;
const RAYON_CHIFFRES = 88;

/** Les 12 chiffres du cadran ; 12, 3, 6 et 9 plus grands. */
const CHIFFRES: Chiffre[] = Array.from({ length: 12 }, (_, i) => {
  const n = i + 1;
  const angle = (n * 30 * Math.PI) / 180;
  return {
    texte: String(n),
    x: +(CENTRE + RAYON_CHIFFRES * Math.sin(angle)).toFixed(1),
    y: +(CENTRE - RAYON_CHIFFRES * Math.cos(angle)).toFixed(1),
    majeur: n % 3 === 0,
  };
});

/** Le cadran à aiguilles, dessiné en SVG. */
@Component({
  selector: 'app-cadran-analogique',
  templateUrl: './cadran-analogique.component.html',
  styleUrl: './cadran-analogique.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadranAnalogiqueComponent {
  readonly heure = input.required<HeureMinuteSeconde>();
  protected readonly chiffres = CHIFFRES;

  protected readonly rotationHeures = computed(() => {
    const { h, m } = this.heure();
    return `rotate(${(h % 12) * 30 + m * 0.5} 150 150)`;
  });
  protected readonly rotationMinutes = computed(() => {
    const { m, s } = this.heure();
    return `rotate(${m * 6 + s * 0.1} 150 150)`;
  });
  protected readonly rotationSecondes = computed(() => `rotate(${this.heure().s * 6} 150 150)`);
}
