import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JugadoresCrearPage } from './jugadores-crear.page';

describe('JugadoresCrearPage', () => {
  let component: JugadoresCrearPage;
  let fixture: ComponentFixture<JugadoresCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadoresCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
