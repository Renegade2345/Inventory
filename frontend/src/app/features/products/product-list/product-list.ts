import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { ProductService, Product } from '../../../core/services/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  loading = true;

  error = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {

    this.loading = true;
    this.error = '';

    this.productService.getProducts().subscribe({

      next: (products) => {
        this.products = products;
        this.loading = false;
      },

      error: (err) => {
        console.error(err);
        this.error = 'Failed to load products';
        this.loading = false;
      }

    });
  }

  deleteProduct(id: string): void {

    if (!confirm("Delete this product?")) return;

    this.productService.deleteProduct(id).subscribe({

      next: () => {
        this.products = this.products.filter(p => p._id !== id);
      },

      error: () => {
        alert("Delete failed");
      }

    });
  }

  editProduct(id: string): void {
    this.router.navigate(['/products/edit', id]);
  }

  goToCreate(): void {
    this.router.navigate(['/products/new']);
  }

}
