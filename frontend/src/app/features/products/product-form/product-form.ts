import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

import { ProductService, Product } from '../../../core/services/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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

  isEditMode = false;

  loading = false;   // FIX: add this
  error = '';        // FIX: add this

  productId: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {

      this.isEditMode = true;

      this.loading = true;

      this.productService.getProduct(this.productId)
        .subscribe({

          next: (data:Product) => {
            this.product = data;
          },

          error: () => {
            this.error = 'Failed to load product';
          },

          complete: () => {
            this.loading = false;
          }

        });

    }

  }


  onSubmit(): void {

    this.loading = true;

    this.error = '';

    if (this.isEditMode && this.productId) {

      this.productService.updateProduct(this.productId, this.product)
        .subscribe({

          next: () => {
            this.router.navigate(['/products']);
          },

          error: () => {
            this.error = 'Update failed';
            this.loading = false;
          }

        });

    }
    else {

      this.productService.createProduct(this.product)
        .subscribe({

          next: () => {
            this.router.navigate(['/products']);
          },

          error: () => {
            this.error = 'Creation failed';
            this.loading = false;
          }

        });

    }

  }

}
