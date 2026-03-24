import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventariosListadoPage } from './inventarios-listado.page';

describe('InventariosListadoPage', () => {
  let component: InventariosListadoPage;
  let fixture: ComponentFixture<InventariosListadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InventariosListadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
