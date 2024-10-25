import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private apiUrl = 'http://localhost:5000/api/products';

  getProducts(): Observable<Product[]> {
    return new Observable((observer) => {
      axios
        .get(this.apiUrl)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  addProduct(product: Product): Observable<Product> {
    return new Observable((observer) => {
      axios
        .post(this.apiUrl, product)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  updateProduct(product: Product): Observable<Product> {
    return new Observable((observer) => {
      axios
        .put(`${this.apiUrl}/${product._id}`, product) // Usar _id
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  deleteProduct(product: Product): Observable<any> {
    return new Observable((observer) => {
      axios
        .delete(`${this.apiUrl}/${product._id}`) // Usar _id
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
