import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculatriceComponent } from './calculatrice/calculatrice.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalculatriceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'calculatrice';
}
