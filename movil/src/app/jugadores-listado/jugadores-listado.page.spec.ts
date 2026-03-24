import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JugadoresListadoPage } from './jugadores-listado.page';

describe('JugadoresListadoPage', () => {
  let component: JugadoresListadoPage;
  let fixture: ComponentFixture<JugadoresListadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadoresListadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
