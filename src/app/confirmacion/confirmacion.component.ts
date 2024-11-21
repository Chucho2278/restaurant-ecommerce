import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css'],
})
export class ConfirmacionComponent implements OnInit {
  order: any;
  total: number = 0;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const orderId = params['orderId'];
      this.orderService.getOrder(orderId).subscribe(
        (response) => {
          this.order = response;
          this.calculateTotal();
        },
        (error) => {
          console.error('Error fetching order:', error);
        }
      );
    });
  }

  calculateTotal() {
    this.total = this.order.items.reduce(
      (acc: number, item: any) => acc + item.product.price * item.quantity,
      0
    );
  }
}
