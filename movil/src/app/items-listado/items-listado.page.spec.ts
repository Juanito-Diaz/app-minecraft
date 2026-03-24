import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsListadoPage } from './items-listado.page';

describe('ItemsListadoPage', () => {
  let component: ItemsListadoPage;
  let fixture: ComponentFixture<ItemsListadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
