import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventariosDetallePage } from './inventarios-detalle.page';

describe('InventariosDetallePage', () => {
  let component: InventariosDetallePage;
  let fixture: ComponentFixture<InventariosDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InventariosDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
