import { TestBed } from '@angular/core/testing';

import { Inventarios } from './inventarios';

describe('Inventarios', () => {
  let service: Inventarios;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Inventarios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
