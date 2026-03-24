import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsCrearPage } from './items-crear.page';

describe('ItemsCrearPage', () => {
  let component: ItemsCrearPage;
  let fixture: ComponentFixture<ItemsCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
