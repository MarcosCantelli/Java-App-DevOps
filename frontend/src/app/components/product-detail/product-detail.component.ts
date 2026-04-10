import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: false,  // Certifique-se de que está como FALSE
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product | null = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,   // lê o :id da URL
    private router: Router,          // navega entre páginas
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (data) => { this.product = data; this.loading = false; },
      error: () => { this.loading = false; this.error = true; }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}