import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { ProductsComponent } from './products/products.component';
import { CrearFuncionariosComponent } from './crear-funcionarios/crear-funcionarios.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard'; // Importa el guard de autenticación

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'menu', component: ProductListComponent },
  { path: 'carrito', component: CartComponent },
  {
    path: 'funcionarios',
    component: FuncionariosComponent,
    canActivate: [AuthGuard],
  }, // Añade el guard de autenticación
  { path: 'productos', component: ProductsComponent, canActivate: [AuthGuard] },
  {
    path: 'crear-funcionarios',
    component: CrearFuncionariosComponent,
    canActivate: [AuthGuard],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
