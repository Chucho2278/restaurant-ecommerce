import { Injectable } from '@angular/core';
import { Product } from './product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: { product: Product; quantity: number }[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  addToCart(product: Product) {
    const existingItem = this.items.find(
      (item) => item.product._id === product._id
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    this.cartItemCount.next(this.getTotalItemsCount());
  }

  getItems() {
    return this.items;
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  getTotalItemsCount(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  clearCart() {
    this.items = [];
    this.cartItemCount.next(this.getTotalItemsCount());
    return this.items;
  }

  removeFromCart(product: Product) {
    const existingItem = this.items.find(
      (item) => item.product._id === product._id
    );
    if (existingItem) {
      existingItem.quantity--;
      if (existingItem.quantity === 0) {
        this.items = this.items.filter(
          (item) => item.product._id !== product._id
        );
      }
    }
    this.cartItemCount.next(this.getTotalItemsCount());
  }
}
