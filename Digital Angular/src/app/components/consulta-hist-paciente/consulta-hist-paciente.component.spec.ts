import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaHistPacienteComponent } from './consulta-hist-paciente.component';

describe('ConsultaHistPacienteComponent', () => {
  let component: ConsultaHistPacienteComponent;
  let fixture: ComponentFixture<ConsultaHistPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaHistPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaHistPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
