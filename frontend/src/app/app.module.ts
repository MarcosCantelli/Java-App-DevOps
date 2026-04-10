import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
// Alterado: Importando a classe "App" do arquivo "app" (sem .component)
import { App } from './app'; 
// Alterado: Importando a classe "Navbar" do arquivo correto
import { Navbar } from './components/navbar/navbar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

@NgModule({
  declarations: [
    App,            // Alterado de AppComponent para App
    Navbar,         // Alterado de NavbarComponent para Navbar
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule
  ],
  bootstrap: [App] // Alterado de AppComponent para App
})
export class AppModule {}