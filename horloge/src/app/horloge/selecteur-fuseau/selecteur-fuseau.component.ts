import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { FUSEAUX, deuxChiffres, heureDans } from '../horloge.service';

/** La grille des 12 villes, avec l'heure actuelle de chacune. */
@Component({
  selector: 'app-selecteur-fuseau',
  templateUrl: './selecteur-fuseau.component.html',
  styleUrl: './selecteur-fuseau.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelecteurFuseauComponent {
  readonly maintenant = input.required<Date>();
  readonly fuseauActif = input<string | null>(null);
  readonly choix = output<string | null>();

  protected readonly villes = computed(() =>
    FUSEAUX.map((f) => {
      const { h, m } = heureDans(this.maintenant(), f.id);
      return { ...f, heure: `${deuxChiffres(h)}:${deuxChiffres(m)}`, actif: f.id === this.fuseauActif() };
    }),
  );
}
