import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProductService, Product } from '../../../core/services/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit {

  // product data
  products: Product[] = [];

  // ui state
  loading: boolean = false;
  error: string = '';

  // filters
  searchTerm: string = '';
  selectedCategory: string = '';
  sortOption: string = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}



  // ============================
  // INIT
  // ============================
  ngOnInit(): void {

    console.log("ProductListComponent initialized");

    this.loadProducts();

  }



  // ============================
  // LOAD PRODUCTS
  // ============================
  loadProducts(): void {

    console.log("Loading products...");

    this.loading = true;
    this.error = '';

    this.productService
      .getProducts(
        this.searchTerm,
        this.selectedCategory,
        this.sortOption
      )
      .subscribe({

        next: (data: Product[]) => {

          console.log("Products received:", data);

          this.products = data;

          this.loading = false;

        },

        error: (err: any) => {

          console.error("Error loading products:", err);

          this.error = "Failed to load products";

          this.loading = false;

        }

      });

  }



  // ============================
  // SEARCH
  // ============================
  onSearch(): void {

    console.log("Searching:", this.searchTerm);

    this.loadProducts();

  }



  // ============================
  // FILTER
  // ============================
  onFilter(): void {

    console.log("Filtering category:", this.selectedCategory);

    this.loadProducts();

  }



  // ============================
  // SORT
  // ============================
  onSort(): void {

    console.log("Sorting:", this.sortOption);

    this.loadProducts();

  }



  // ============================
  // DELETE PRODUCT
  // ============================
  deleteProduct(id: string): void {

    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    this.loading = true;

    this.productService
      .deleteProduct(id)
      .subscribe({

        next: () => {

          console.log("Product deleted successfully");

          this.loadProducts();

        },

        error: (err: any) => {

          console.error("Delete failed:", err);

          alert("Failed to delete product");

          this.loading = false;

        }

      });

  }



  // ============================
  // EDIT PRODUCT
  // ============================
  editProduct(id: string): void {

    console.log("Editing product:", id);

    this.router.navigate(['/products/edit', id]);

  }



  // ============================
  // CREATE PRODUCT
  // ============================
  goToCreate(): void {

    this.router.navigate(['/products/new']);

  }

}
