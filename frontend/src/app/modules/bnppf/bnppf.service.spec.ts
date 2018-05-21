import { TestBed, inject } from '@angular/core/testing';

import { BnppfService } from './bnppf.service';

describe('BnppfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BnppfService]
    });
  });

  it('should be created', inject([BnppfService], (service: BnppfService) => {
    expect(service).toBeTruthy();
  }));
});
