import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BiomasListadoPage } from './biomas-listado.page';

describe('BiomasListadoPage', () => {
  let component: BiomasListadoPage;
  let fixture: ComponentFixture<BiomasListadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BiomasListadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
