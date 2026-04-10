import { Component, signal } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  templateUrl: './app.component.html', // Alterado de ./app.html para ./app.component.html
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}