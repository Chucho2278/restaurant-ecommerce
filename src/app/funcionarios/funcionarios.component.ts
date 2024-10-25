import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ProductApiService } from '../product-api.service';
import { UserApiService } from '../user-api.service';
import { AuthService } from '../auth.service';
import { Product } from '../product';
import { User } from '../user';

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css'],
})
export class FuncionariosComponent implements OnInit {
  productForm: FormGroup;
  registerForm: FormGroup;
  products: Product[] = [];
  selectedProduct: Product | null = null;
  section: 'productos' | 'funcionarios' = 'productos'; // Asignar 'productos' como valor por defecto

  constructor(
    private fb: FormBuilder,
    private productApiService: ProductApiService,
    private userApiService: UserApiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: [''],
      price: [''],
      description: [''],
      imageUrl: [''],
    });
    this.registerForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit() {
    if (!this.authService.checkAuth()) {
      this.router.navigate(['/login']);
    } else {
      this.loadProducts();
    }
  }

  showSection(section: 'productos' | 'funcionarios') {
    this.section = section;
    this.selectedProduct = null; // Reset selected product when switching sections
    this.productForm.reset(); // Reset form when switching sections
  }

  loadProducts() {
    this.productApiService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  addProduct() {
    if (this.productForm.valid) {
      this.productApiService.addProduct(this.productForm.value).subscribe(
        (response) => {
          console.log('Product added successfully:', response);
          this.productForm.reset();
          this.loadProducts();
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
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
      this.productApiService.updateProduct(updatedProduct).subscribe(
        (response) => {
          console.log('Product updated successfully:', response);
          this.selectedProduct = null;
          this.productForm.reset();
          this.loadProducts();
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    }
  }

  deleteProduct(product: Product) {
    this.productApiService.deleteProduct(product).subscribe(
      (response) => {
        console.log('Product deleted successfully:', response);
        this.loadProducts();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  registerUser() {
    if (this.registerForm.valid) {
      const newUser: User = this.registerForm.value;
      this.userApiService.addUser(newUser).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          this.registerForm.reset();
        },
        (error) => {
          console.error('Error registering user:', error);
        }
      );
    }
  }
}
