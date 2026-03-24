import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobsCrearPage } from './mobs-crear.page';

describe('MobsCrearPage', () => {
  let component: MobsCrearPage;
  let fixture: ComponentFixture<MobsCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MobsCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
