import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductApiService } from './product-api.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private productApiService: ProductApiService) {}

  getProducts(): Observable<Product[]> {
    return this.productApiService.getProducts();
  }
}
