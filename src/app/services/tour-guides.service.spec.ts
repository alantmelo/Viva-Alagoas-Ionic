import { TestBed } from '@angular/core/testing';

import { TourGuidesService } from './tour-guides.service';

describe('TourGuidesService', () => {
  let service: TourGuidesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourGuidesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
