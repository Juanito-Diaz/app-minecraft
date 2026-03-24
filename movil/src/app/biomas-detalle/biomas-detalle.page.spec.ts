import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BiomasDetallePage } from './biomas-detalle.page';

describe('BiomasDetallePage', () => {
  let component: BiomasDetallePage;
  let fixture: ComponentFixture<BiomasDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BiomasDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
