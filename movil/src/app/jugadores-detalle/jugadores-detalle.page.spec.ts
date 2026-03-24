import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JugadoresDetallePage } from './jugadores-detalle.page';

describe('JugadoresDetallePage', () => {
  let component: JugadoresDetallePage;
  let fixture: ComponentFixture<JugadoresDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadoresDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
