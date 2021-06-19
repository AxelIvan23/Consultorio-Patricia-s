import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrHistorialComponent } from './dr-historial.component';

describe('DrHistorialComponent', () => {
  let component: DrHistorialComponent;
  let fixture: ComponentFixture<DrHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrHistorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
