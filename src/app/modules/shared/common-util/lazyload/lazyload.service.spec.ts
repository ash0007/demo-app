import { TestBed } from '@angular/core/testing';

import { LazyloadService } from './lazyload.service';

describe('LazyloadService', () => {
  let service: LazyloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazyloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
