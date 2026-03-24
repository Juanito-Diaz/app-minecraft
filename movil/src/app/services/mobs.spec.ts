import { TestBed } from '@angular/core/testing';

import { Mobs } from './mobs';

describe('Mobs', () => {
  let service: Mobs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mobs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
