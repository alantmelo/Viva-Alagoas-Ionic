import { TestBed } from '@angular/core/testing';

import { TouristAttractionsService } from './tourist-attractions.service';

describe('TouristAttractionsService', () => {
  let service: TouristAttractionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristAttractionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
