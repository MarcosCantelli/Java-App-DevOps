import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; // Necessário para routerLinkActive

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isDark = false;

  ngOnInit(): void {
    const saved = localStorage.getItem('theme');
    this.isDark = saved === 'dark';
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme(): void {
    document.body.classList.toggle('dark-mode', this.isDark);
  }

  onLogoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.style.display = 'none';
    const span = document.createElement('span');
    span.className = 'logo-text';
    span.textContent = 'MVRC Shop';
    img.parentElement?.appendChild(span);
  }
}