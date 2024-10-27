import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductApiService } from '../product-api.service';
import { CartService } from '../cart.service'; // Importar CartService
import { of } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductApiService: jasmine.SpyObj<ProductApiService>;
  let mockCartService: jasmine.SpyObj<CartService>; // Añadir Mock de CartService

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductApiService', [
      'getProducts',
    ]);
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']); // Crear Spy para CartService

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        { provide: ProductApiService, useValue: productServiceSpy },
        { provide: CartService, useValue: cartServiceSpy }, // Proveer Mock de CartService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    mockProductApiService = TestBed.inject(
      ProductApiService
    ) as jasmine.SpyObj<ProductApiService>;
    mockCartService = TestBed.inject(
      CartService
    ) as jasmine.SpyObj<CartService>; // Inyectar Mock de CartService
    mockProductApiService.getProducts.and.returnValue(
      of([
        {
          _id: '1234567890abcdef12345678',
          name: 'Test Product 1',
          price: 100,
          description: 'Description 1',
          imageUrl: 'image1.jpg',
        },
        {
          _id: 'abcdef1234567890abcdef12',
          name: 'Test Product 2',
          price: 200,
          description: 'Description 2',
          imageUrl: 'image2.jpg',
        },
      ])
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(component.products.length).toBe(2);
    expect(component.products[0].name).toBe('Test Product 1');
  });

  it('should add product to cart', () => {
    const product = {
      _id: '1234567890abcdef12345678',
      name: 'Test Product 1',
      price: 100,
      description: 'Description 1',
      imageUrl: 'image1.jpg',
    };
    component.addToCart(product);
    expect(mockCartService.addToCart).toHaveBeenCalledWith(product);
  });
});
