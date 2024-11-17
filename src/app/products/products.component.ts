import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { ProductApiService } from '../product-api.service';
import { Product } from '../product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Asegúrate de importar ReactiveFormsModule aquí
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  products: Product[] = [];
  selectedProduct: Product | null = null;

  constructor(
    private fb: FormBuilder,
    private productApiService: ProductApiService
  ) {
    this.productForm = this.fb.group({
      name: [''],
      price: [''],
      description: [''],
      imageUrl: [''],
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productApiService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  addProduct() {
    if (this.productForm.valid) {
      this.productApiService
        .addProduct(this.productForm.value)
        .subscribe(() => {
          this.productForm.reset();
          this.loadProducts();
        });
    }
  }

  editProduct(product: Product) {
    this.selectedProduct = product;
    this.productForm.setValue({
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
    });
  }

  updateProduct() {
    if (this.productForm.valid && this.selectedProduct) {
      const updatedProduct = {
        ...this.selectedProduct,
        ...this.productForm.value,
      };
      this.productApiService.updateProduct(updatedProduct).subscribe(() => {
        this.selectedProduct = null;
        this.productForm.reset();
        this.loadProducts();
      });
    }
  }

  deleteProduct(product: Product) {
    this.productApiService.deleteProduct(product).subscribe(() => {
      this.loadProducts();
    });
  }
}
