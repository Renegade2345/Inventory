import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../../core/services/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductFormComponent {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: ''
  };

  loading = false;
  error = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  onSubmit() {

    this.loading = true;
    this.error = '';

    this.productService.createProduct(this.product).subscribe({

      next: () => {
        this.loading = false;
        this.router.navigate(['/products']);
      },

      error: (err) => {
        this.error = err.error?.message || 'Failed to create product';
        this.loading = false;
      }

    });

  }

}
