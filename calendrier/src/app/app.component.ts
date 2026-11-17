import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendrierComponent } from './calendrier/calendrier.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalendrierComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'calendrier';
}
