import { TestBed } from '@angular/core/testing';

import { GraphicTableService } from './graphic-table.service';

describe('GraphicTableService', () => {
  let service: GraphicTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphicTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
