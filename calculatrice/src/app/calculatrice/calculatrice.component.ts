import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CalculatriceService } from './calculatrice.service';
import { EcranComponent } from './ecran/ecran.component';
import { ToucheComponent } from './touche/touche.component';

/** La calculatrice complète, au design « 2048 ». */
@Component({
  selector: 'app-calculatrice',
  imports: [EcranComponent, ToucheComponent],
  providers: [CalculatriceService],
  templateUrl: './calculatrice.component.html',
  styleUrl: './calculatrice.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatriceComponent {
  protected readonly calc = inject(CalculatriceService);
  protected readonly chiffres = { ligne1: ['7', '8', '9'], ligne2: ['4', '5', '6'], ligne3: ['1', '2', '3'] };
}
