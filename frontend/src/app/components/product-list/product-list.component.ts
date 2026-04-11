import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product, Category } from '../../models/product.model';
import { CommonModule } from '@angular/common'; // Necessário para *ngIf, *ngFor e Pipes
import { RouterModule } from '@angular/router'; // Necessário para [routerLink]

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategoryId: number | null = null;
  loading = true;
  error = false;
  fallbackImage = 'https://placehold.co/600x400/1a2744/4fc3f7?text=Sem+imagem';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = false;
    const obs = this.selectedCategoryId
      ? this.productService.getProductsByCategory(this.selectedCategoryId)
      : this.productService.getProducts();

    obs.subscribe({
      next: (data) => { this.products = data; this.loading = false; },
      error: (err) => { console.error(err); this.loading = false; this.error = true; }
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error(err)
    });
  }

  filterByCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.loadProducts();
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = this.fallbackImage;
  }
}