import { TestBed } from '@angular/core/testing';

import { ApiSerficeService } from './api.service';

describe('ApiSerficeService', () => {
  let service: ApiSerficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSerficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
