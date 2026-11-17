import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HorlogeComponent } from './horloge/horloge.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HorlogeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'horloge';
}
