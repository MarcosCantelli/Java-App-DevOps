import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common'; // Necessário para o pipe 'number'

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = 'https://placehold.co/600x400/1a2744/4fc3f7?text=Sem+imagem';
  }
}