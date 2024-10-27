import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductApiService } from './product-api.service';
import { Product } from './product';

describe('ProductApiService', () => {
  let service: ProductApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductApiService],
    });
    service = TestBed.inject(ProductApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch products', () => {
    const mockProducts: Product[] = [
      {
        _id: '1',
        name: 'Hamburguesa Sencilla',
        price: 17000,
        imageUrl: 'assets/images/hamburguesa-sencilla.jpg',
      },
      {
        _id: '2',
        name: 'Hamburguesa Premium',
        price: 24000,
        imageUrl: 'assets/images/hamburguesa-premium.jpg',
      },
    ];

    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should add a product', () => {
    const newProduct: Product = {
      _id: '3',
      name: 'Perro Sencillo',
      price: 14000,
      imageUrl: 'assets/images/perro-sencillo.jpg',
    };

    service.addProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('POST');
    req.flush(newProduct);
  });

  it('should update a product', () => {
    const updatedProduct: Product = {
      _id: '1',
      name: 'Hamburguesa Sencilla Actualizada',
      price: 18000,
      imageUrl: 'assets/images/hamburguesa-actualizada.jpg',
    };

    service.updateProduct(updatedProduct).subscribe((product) => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne(
      `${service['apiUrl']}/${updatedProduct._id}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProduct);
  });

  it('should delete a product', () => {
    const productId = '1';

    service
      .deleteProduct({ _id: productId } as Product)
      .subscribe((response) => {
        expect(response.message).toBe('Producto eliminado');
      });

    const req = httpMock.expectOne(`${service['apiUrl']}/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Producto eliminado' });
  });
});
