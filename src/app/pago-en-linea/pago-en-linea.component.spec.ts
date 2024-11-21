import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoEnLineaComponent } from './pago-en-linea.component';

describe('PagoEnLineaComponent', () => {
  let component: PagoEnLineaComponent;
  let fixture: ComponentFixture<PagoEnLineaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoEnLineaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoEnLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
