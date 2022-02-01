import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '@ngrx-nx-workshop/api-interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/product/product-list');
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`/api/product/${id}`);
  }
}
