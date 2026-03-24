import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventariosCrearPage } from './inventarios-crear.page';

describe('InventariosCrearPage', () => {
  let component: InventariosCrearPage;
  let fixture: ComponentFixture<InventariosCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InventariosCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
