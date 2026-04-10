import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { ProductListComponent } from './app/components/product-list/product-list.component';
import { ProductDetailComponent } from './app/components/product-detail/product-detail.component';

// Definindo as rotas que antes estavam no módulo
const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'produtos', component: ProductListComponent },
  { path: 'produto/:id', component: ProductDetailComponent },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),      // Habilita o carregamento de dados do backend
    provideRouter(routes)     // Habilita a navegação e o funcionamento dos botões
  ]
}).catch(err => console.error(err));