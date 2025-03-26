import { TestBed } from '@angular/core/testing';

import { ComparePricesService } from './compare-prices.service';

describe('ComparePricesService', () => {
  let service: ComparePricesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComparePricesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
