import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobsDetallePage } from './mobs-detalle.page';

describe('MobsDetallePage', () => {
  let component: MobsDetallePage;
  let fixture: ComponentFixture<MobsDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MobsDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
