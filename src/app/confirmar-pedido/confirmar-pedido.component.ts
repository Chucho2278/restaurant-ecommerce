import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-confirmar-pedido',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './confirmar-pedido.component.html',
  styleUrls: ['./confirmar-pedido.component.css'],
})
export class ConfirmarPedidoComponent implements OnInit {
  orderForm: FormGroup;
  isDomicilio: boolean = false;
  paymentMethod: 'efectivo' | 'online' | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService
  ) {
    this.orderForm = this.fb.group({
      name: [''],
      surname: [''],
      phone: [''],
      address: [''],
      deliveryTime: [''],
      pickupTime: [''],
      email: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.isDomicilio = params['method'] === 'domicilio';
    });
  }

  setPaymentMethod(method: 'efectivo' | 'online') {
    this.paymentMethod = method;
  }

  onSubmit() {
    if (this.orderForm.valid && this.paymentMethod) {
      const orderData = {
        ...this.orderForm.value,
        paymentMethod: this.paymentMethod,
        items: this.cartService.getItems().map((item) => ({
          product: {
            name: item.product.name,
            price: item.product.price,
          },
          quantity: item.quantity,
        })),
      };

      if (this.paymentMethod === 'efectivo') {
        this.orderService.createOrder(orderData).subscribe(
          (response) => {
            this.router.navigate(['/confirmacion', { orderId: response._id }]);
          },
          (error) => {
            console.error('Error creating order:', error);
          }
        );
      } else if (this.paymentMethod === 'online') {
        // Guardar la orden primero y luego redirigir a la página de pago en línea con el ID de la orden
        this.orderService.createOrder(orderData).subscribe(
          (response) => {
            const orderId = response._id;
            this.router.navigate(['/pago-en-linea', { orderId }]);
          },
          (error) => {
            console.error('Error creating order:', error);
          }
        );
      }
    } else {
      console.error(
        'Please fill all the required fields and select a payment method.'
      );
    }
  }
}
