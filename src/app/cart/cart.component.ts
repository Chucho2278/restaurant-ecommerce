import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: { product: Product; quantity: number }[] = [];
  total: number = 0;
  deliveryMethod: 'domicilio' | 'recoger' | null = null;
  alertMessage: string | null = null; // Añadir una variable para el mensaje de alerta

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.items = this.cartService.getItems();
    this.calculateTotal();
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    this.items = this.cartService.getItems();
    this.calculateTotal();
  }

  selectDelivery(method: 'domicilio' | 'recoger') {
    this.deliveryMethod = method;
  }

  confirmOrder() {
    if (this.items.length === 0) {
      this.alertMessage =
        'Agrega productos al carrito para continuar con el proceso de compra';
    } else if (this.deliveryMethod) {
      this.alertMessage = null; // Limpiar el mensaje de alerta si hay productos en el carrito y se selecciona un método de entrega
      this.router.navigate([
        `/confirmar-pedido`,
        { method: this.deliveryMethod },
      ]);
    }
  }
}
