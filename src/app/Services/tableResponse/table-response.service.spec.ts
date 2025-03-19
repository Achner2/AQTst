import { TestBed } from '@angular/core/testing';

import { TableResponseService } from './table-response.service';

describe('TableResponseService', () => {
  let service: TableResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
