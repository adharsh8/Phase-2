import { TestBed } from '@angular/core/testing';

import { StreamService } from './Data/stream.service';

describe('StreamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StreamService = TestBed.get(StreamService);
    expect(service).toBeTruthy();
  });
});
