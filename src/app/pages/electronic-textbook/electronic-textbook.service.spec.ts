import { TestBed } from '@angular/core/testing';

import ElectronicTextbookService from './electronic-textbook.service';

describe('ElectronicTextbookService', () => {
  let service: ElectronicTextbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectronicTextbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
