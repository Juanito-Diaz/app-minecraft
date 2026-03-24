import { TestBed } from '@angular/core/testing';

import { Mundos } from './mundos';

describe('Mundos', () => {
  let service: Mundos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mundos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
