import { TestBed } from '@angular/core/testing';

import { BeachesService } from './beaches.service';

describe('BeachesService', () => {
  let service: BeachesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeachesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
