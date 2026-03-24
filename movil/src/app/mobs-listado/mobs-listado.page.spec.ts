import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobsListadoPage } from './mobs-listado.page';

describe('MobsListadoPage', () => {
  let component: MobsListadoPage;
  let fixture: ComponentFixture<MobsListadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MobsListadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
