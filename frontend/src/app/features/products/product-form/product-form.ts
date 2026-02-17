import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService, Product } from '../../../core/services/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductFormComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: ''
  };

  loading = false;
  error = '';

  isEditMode = false;
  productId = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.productId = this.route.snapshot.paramMap.get('id') || '';

    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct();
    }

  }

  loadProduct(): void {

    this.productService.getProduct(this.productId)
      .subscribe({

        next: (data) => {
          this.product = data;
        },

        error: () => {
          this.error = 'Failed to load product';
        }

      });

  }

  onSubmit(): void {

    this.loading = true;
    this.error = '';

    if (this.isEditMode) {

      this.productService.updateProduct(this.productId, this.product)
        .subscribe({

          next: () => {
            this.router.navigate(['/products']);
          },

          error: (err) => {
            console.error(err);
            this.error = 'Update failed';
            this.loading = false;
          }

        });

    } else {

      this.productService.createProduct(this.product)
        .subscribe({

          next: () => {
            this.router.navigate(['/products']);
          },

          error: (err) => {
            console.error(err);
            this.error = 'Create failed';
            this.loading = false;
          }

        });

    }

  }

}
