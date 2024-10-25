import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: Product[] = [];

  addToCart(product: Product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  removeFromCart(product: Product) {
    this.items = this.items.filter((item) => item._id !== product._id); // Usar _id para filtrar
  }
}
