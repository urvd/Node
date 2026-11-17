import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/** Bas du calendrier : date choisie, semaine, écart avec aujourd'hui et bouton « Aujourd'hui ». */
@Component({
  selector: 'app-resume-selection',
  templateUrl: './resume-selection.component.html',
  styleUrl: './resume-selection.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeSelectionComponent {
  readonly date = input.required<string>();
  readonly infos = input.required<string>();
  readonly aujourdhui = output<void>();
}
