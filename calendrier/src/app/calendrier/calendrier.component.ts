import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CalendrierService } from './calendrier.service';
import { GrilleChoixComponent } from './grille-choix/grille-choix.component';
import { GrilleJoursComponent } from './grille-jours/grille-jours.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ResumeSelectionComponent } from './resume-selection/resume-selection.component';

/** Le calendrier complet, au design « 2048 ». */
@Component({
  selector: 'app-calendrier',
  imports: [GrilleChoixComponent, GrilleJoursComponent, NavigationComponent, ResumeSelectionComponent],
  providers: [CalendrierService],
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendrierComponent {
  protected readonly cal = inject(CalendrierService);

  protected readonly plage = computed(() => `${this.cal.anneeMin()} — ${this.cal.anneeMax()}`);
  protected readonly libellePrecedent = computed(() => (this.cal.mode() === 'mois' ? 'Année précédente' : 'Mois précédent'));
  protected readonly libelleSuivant = computed(() => (this.cal.mode() === 'mois' ? 'Année suivante' : 'Mois suivant'));
}
