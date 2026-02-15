import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductService, Product } from '../../../core/services/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent {

  products: Product[] = [];

  loading = true;

  error = '';

  constructor(private productService: ProductService) {

    // force fetch every time component constructed
    this.fetchProducts();

  }

  fetchProducts(): void {

    this.loading = true;

    this.productService.getProducts().subscribe({

      next: (products: Product[]) => {

        console.log("Products loaded:", products);

        this.products = products;

        this.loading = false;

      },

      error: (err) => {

        console.error(err);

        this.error = "Failed to load products";

        this.loading = false;

      }

    });

  }

  deleteProduct(id: string): void {

    const confirmDelete = confirm("Delete this product?");

    if (!confirmDelete) return;

    this.productService.deleteProduct(id).subscribe({

      next: () => {

        // remove instantly from UI
        this.products = this.products.filter(p => p._id !== id);

      },

      error: (err) => {

        console.error(err);

        alert("Delete failed");

      }

    });

  }

}
