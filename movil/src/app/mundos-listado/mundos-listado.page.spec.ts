import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MundosListadoPage } from './mundos-listado.page';

describe('MundosListadoPage', () => {
  let component: MundosListadoPage;
  let fixture: ComponentFixture<MundosListadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MundosListadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
