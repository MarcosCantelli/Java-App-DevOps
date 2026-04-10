import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product, Category } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: false, // Adicionado explicitamente para bater com seu AppModule
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  selectedCategoryId: number | null = null;
  loading = true;
  error = false;

  // O Angular usará o ProductService que tem 'providedIn: root'
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
      next: (data: Product[]) => { // Adicionado tipo : Product[]
        this.products = data;
        this.loading = false;
      },
      error: (err: any) => { // Adicionado tipo : any
        console.error('Erro:', err);
        this.loading = false;
        this.error = true;
      }
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data: Category[]) => this.categories = data, // Adicionado tipo : Category[]
      error: (err: any) => console.error('Erro ao carregar categorias:', err)
    });
  }

  filterByCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.loadProducts();
  }
}