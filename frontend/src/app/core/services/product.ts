import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // FIXED — extract data array
  getProducts(): Observable<Product[]> {

  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
    return this.http
      .get<ProductApiResponse>(this.API_URL, {
        headers: this.getHeaders()
      })
      .pipe(
        map(response => response.data)
      );
  }

  getProduct(id: string): Observable<Product> {
    return this.http
      .get<{ data: Product }>(`${this.API_URL}/${id}`, {
        headers: this.getHeaders()
      })
      .pipe(
        map(res => res.data)
      );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http
      .post<{ data: Product }>(this.API_URL, product, {
        headers: this.getHeaders()
      })
      .pipe(
        map(res => res.data)
      );
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http
      .put<{ data: Product }>(`${this.API_URL}/${id}`, product, {
        headers: this.getHeaders()
      })
      .pipe(
        map(res => res.data)
      );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
