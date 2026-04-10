import { Component, signal } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterModule], // RouterModule é vital aqui!
  template: `
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet> </main>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}