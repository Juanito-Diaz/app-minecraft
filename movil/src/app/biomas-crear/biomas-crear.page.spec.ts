import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BiomasCrearPage } from './biomas-crear.page';

describe('BiomasCrearPage', () => {
  let component: BiomasCrearPage;
  let fixture: ComponentFixture<BiomasCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BiomasCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
