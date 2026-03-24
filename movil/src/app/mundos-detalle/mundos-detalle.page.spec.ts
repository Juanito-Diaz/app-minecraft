import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MundosDetallePage } from './mundos-detalle.page';

describe('MundosDetallePage', () => {
  let component: MundosDetallePage;
  let fixture: ComponentFixture<MundosDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MundosDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
