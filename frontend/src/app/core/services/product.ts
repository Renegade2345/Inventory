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
}

interface ProductsResponse {
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

  // Optional auth headers (keep if using JWT)
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // GET PRODUCTS with filters
  getProducts(
    search?: string,
    category?: string,
    sort?: string
  ): Observable<Product[]> {

    let params: any = {};

    if (search) params.search = search;
    if (category) params.category = category;
    if (sort) params.sort = sort;

    return this.http
      .get<ProductsResponse>(this.API_URL, {
        headers: this.getHeaders(),
        params
      })
      .pipe(
        map(res => res.data)
      );
  }


  // GET SINGLE PRODUCT
getProduct(id: string): Observable<Product> {

  return this.http
    .get<SingleProductResponse>(`${this.API_URL}/${id}`, {
      headers: this.getHeaders()
    })
    .pipe(
      map(res => res.data)
    );

}

  // CREATE
  createProduct(product: Product): Observable<Product> {

    return this.http
      .post<SingleProductResponse>(this.API_URL, product, {
        headers: this.getHeaders()
      })
      .pipe(
        map(res => res.data)
      );
  }

  // UPDATE
  updateProduct(id: string, product: Product): Observable<Product> {

    return this.http
      .put<SingleProductResponse>(
        `${this.API_URL}/${id}`,
        product,
        { headers: this.getHeaders() }
      )
      .pipe(
        map(res => res.data)
      );
  }

  // DELETE
  deleteProduct(id: string): Observable<any> {

    return this.http.delete(
      `${this.API_URL}/${id}`,
      { headers: this.getHeaders() }
    );
  }

}
