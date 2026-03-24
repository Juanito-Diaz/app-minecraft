import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsDetallePage } from './items-detalle.page';

describe('ItemsDetallePage', () => {
  let component: ItemsDetallePage;
  let fixture: ComponentFixture<ItemsDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
