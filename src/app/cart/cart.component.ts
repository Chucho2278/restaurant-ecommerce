import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: Product[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.items.reduce((acc, item) => acc + item.price, 0);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product); // Llamar al servicio para eliminar el producto
    this.items = this.cartService.getItems();
    this.calculateTotal(); // Recalcular el total después de eliminar el producto
  }
}
