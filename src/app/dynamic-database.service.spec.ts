import { TestBed } from '@angular/core/testing';

import { DynamicDatabaseService } from './dynamic-database.service';

describe('DynamicDatabaseService', () => {
  let service: DynamicDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
