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

  loading = false;

  error = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {

    console.log("ProductListComponent initialized");

    this.loadProducts();
  }


  // LOAD PRODUCTS
  loadProducts(): void {

  console.log("Loading products...");

  this.loading = true;

  this.error = '';

  this.productService.getProducts()
    .subscribe({

      next: (data) => {

        console.log("Products received:", data);

        this.products = data;

        this.loading = false;

      },

      error: (err) => {

        console.error("Error loading products:", err);

        this.error = "Failed to load products";

        this.loading = false;

      },

      complete: () => {

        // SAFETY NET
        this.loading = false;

        console.log("Loading finished");

      }

    });

}

editProduct(id: string): void {
  this.router.navigate(['/products/edit', id]);
}



  // DELETE PRODUCT
  deleteProduct(id: string): void {

    const confirmDelete = confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) return;

    this.productService.deleteProduct(id)
      .subscribe({

        next: () => {

          console.log("Product deleted");

          // reload list
          this.loadProducts();
        },

        error: (err) => {

          console.error("Delete failed", err);

          alert("Failed to delete product");
        }

      });

  }


  // NAVIGATE TO CREATE
  goToCreate(): void {

    this.router.navigate(['/products/new']);
  }

}
