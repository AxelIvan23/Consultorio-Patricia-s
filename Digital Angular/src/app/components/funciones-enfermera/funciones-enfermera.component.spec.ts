import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionesEnfermeraComponent } from './funciones-enfermera.component';

describe('FuncionesEnfermeraComponent', () => {
  let component: FuncionesEnfermeraComponent;
  let fixture: ComponentFixture<FuncionesEnfermeraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionesEnfermeraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionesEnfermeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
