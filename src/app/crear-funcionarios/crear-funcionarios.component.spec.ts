import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFuncionariosComponent } from './crear-funcionarios.component';

describe('CrearFuncionariosComponent', () => {
  let component: CrearFuncionariosComponent;
  let fixture: ComponentFixture<CrearFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearFuncionariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
