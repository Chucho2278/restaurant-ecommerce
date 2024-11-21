import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { ProductsComponent } from './products/products.component';
import { CrearFuncionariosComponent } from './crear-funcionarios/crear-funcionarios.component';
import { ConfirmarPedidoComponent } from './confirmar-pedido/confirmar-pedido.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { PagoEnLineaComponent } from './pago-en-linea/pago-en-linea.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'menu', component: ProductListComponent },
  { path: 'carrito', component: CartComponent },
  {
    path: 'funcionarios',
    component: FuncionariosComponent,
    canActivate: [AuthGuard],
  },
  { path: 'productos', component: ProductsComponent, canActivate: [AuthGuard] },
  {
    path: 'crear-funcionarios',
    component: CrearFuncionariosComponent,
    canActivate: [AuthGuard],
  },
  { path: 'confirmar-pedido', component: ConfirmarPedidoComponent },
  { path: 'confirmacion', component: ConfirmacionComponent },
  { path: 'pago-en-linea', component: PagoEnLineaComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
