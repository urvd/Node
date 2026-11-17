import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AffichageNumeriqueComponent } from './affichage-numerique/affichage-numerique.component';
import { CadranAnalogiqueComponent } from './cadran-analogique/cadran-analogique.component';
import { HorlogeService, deuxChiffres } from './horloge.service';
import { InterrupteurComponent } from './interrupteur/interrupteur.component';
import { SelecteurFuseauComponent } from './selecteur-fuseau/selecteur-fuseau.component';

/** L'horloge complète, au design « 2048 ». */
@Component({
  selector: 'app-horloge',
  imports: [AffichageNumeriqueComponent, CadranAnalogiqueComponent, InterrupteurComponent, SelecteurFuseauComponent],
  providers: [HorlogeService],
  templateUrl: './horloge.component.html',
  styleUrl: './horloge.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorlogeComponent {
  protected readonly horloge = inject(HorlogeService);

  protected readonly heureAccessible = computed(() => {
    const { h, m } = this.horloge.heure();
    return `${deuxChiffres(h)} h ${deuxChiffres(m)}`;
  });
}
