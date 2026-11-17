import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/** Interrupteur Analogique / Numérique, avec ses deux libellés cliquables. */
@Component({
  selector: 'app-interrupteur',
  templateUrl: './interrupteur.component.html',
  styleUrl: './interrupteur.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterrupteurComponent {
  readonly numerique = input.required<boolean>();
  readonly basculer = output<void>();
  readonly choisir = output<boolean>();
}
