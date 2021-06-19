import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrNotificacionComponent } from './dr-notificacion.component';

describe('DrNotificacionComponent', () => {
  let component: DrNotificacionComponent;
  let fixture: ComponentFixture<DrNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrNotificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
