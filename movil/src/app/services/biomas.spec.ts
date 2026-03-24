import { TestBed } from '@angular/core/testing';

import { Biomas } from './biomas';

describe('Biomas', () => {
  let service: Biomas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Biomas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
