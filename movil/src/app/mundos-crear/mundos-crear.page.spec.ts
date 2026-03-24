import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MundosCrearPage } from './mundos-crear.page';

describe('MundosCrearPage', () => {
  let component: MundosCrearPage;
  let fixture: ComponentFixture<MundosCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MundosCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
