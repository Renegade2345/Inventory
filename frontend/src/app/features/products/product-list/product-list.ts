import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../core/services/product';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log("ProductListComponent loaded");
    this.loadProducts();
  }

  loadProducts(): void {

    this.productService.getProducts().subscribe({

      next: (products: Product[]) => {

        console.log("Products received:", products);

        this.products = products;

        this.loading = false;

      },

      error: (err) => {

        console.error("Error loading products:", err);

        this.error = "Failed to load products";

        this.loading = false;

      }

    });

  }

}
