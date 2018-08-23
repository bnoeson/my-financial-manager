import { TestBed, inject } from '@angular/core/testing';

import { TransactionFileService } from './transaction-file.service';

describe('TransactionFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionFileService]
    });
  });

  it('should be created', inject([TransactionFileService], (service: TransactionFileService) => {
    expect(service).toBeTruthy();
  }));
});
