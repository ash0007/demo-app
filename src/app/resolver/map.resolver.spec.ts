import { TestBed } from '@angular/core/testing';

import { MapResolver } from './map.resolver';

describe('MapResolver', () => {
  let service: MapResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
