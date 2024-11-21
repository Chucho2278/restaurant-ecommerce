import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmarPedidoComponent } from './confirmar-pedido.component';
import { OrderService } from '../order.service';
import { CartService } from '../cart.service';

describe('ConfirmarPedidoComponent', () => {
  let component: ConfirmarPedidoComponent;
  let fixture: ComponentFixture<ConfirmarPedidoComponent>;
  let orderService: jasmine.SpyObj<OrderService>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const orderSpy = jasmine.createSpyObj('OrderService', ['createOrder']);
    const cartSpy = jasmine.createSpyObj('CartService', ['getItems']);

    await TestBed.configureTestingModule({
      declarations: [ConfirmarPedidoComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: {} },
        { provide: OrderService, useValue: orderSpy },
        { provide: CartService, useValue: cartSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmarPedidoComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Otras pruebas unitarias...
});
