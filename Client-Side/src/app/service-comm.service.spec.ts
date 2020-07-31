import { TestBed } from '@angular/core/testing';

import { ServiceCommService } from './service-comm.service';

describe('ServiceCommService', () => {
  let service: ServiceCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
