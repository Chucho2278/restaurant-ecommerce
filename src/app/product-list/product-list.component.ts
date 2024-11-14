import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductApiService } from '../product-api.service';
import { CartService } from '../cart.service';
import { Product } from '../product';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productApiService: ProductApiService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productApiService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
