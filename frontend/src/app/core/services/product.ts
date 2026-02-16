import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Product {
  _id?: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductApiResponse {
  status: string;
  results: number;
  data: Product[];
}

interface SingleProductResponse {
  status: string;
  data: Product;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  // GET ALL PRODUCTS
  getProducts(): Observable<Product[]> {

    return this.http
      .get<ProductApiResponse>(this.API_URL)
      .pipe(
        map(res => res.data)
      );

  }

  // GET SINGLE PRODUCT
  getProduct(id: string): Observable<Product> {

    return this.http
      .get<SingleProductResponse>(`${this.API_URL}/${id}`)
      .pipe(
        map(res => res.data)
      );

  }

  // CREATE PRODUCT
  createProduct(product: Product): Observable<Product> {

    return this.http
      .post<SingleProductResponse>(this.API_URL, product)
      .pipe(
        map(res => res.data)
      );

  }

  // UPDATE PRODUCT
  updateProduct(id: string, product: Product): Observable<Product> {

    return this.http
      .put<SingleProductResponse>(`${this.API_URL}/${id}`, product)
      .pipe(
        map(res => res.data)
      );

  }

  // DELETE PRODUCT
  deleteProduct(id: string): Observable<any> {

    return this.http.delete(`${this.API_URL}/${id}`);

  }

}
