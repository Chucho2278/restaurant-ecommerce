import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'menu', component: ProductListComponent },
  { path: 'carrito', component: CartComponent },
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
