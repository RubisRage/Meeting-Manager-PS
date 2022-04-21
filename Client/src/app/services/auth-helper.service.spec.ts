import { TestBed } from '@angular/core/testing';

import { AuthHelperService } from './auth-helper.service';

describe('AuthHelperService', () => {
  let service: AuthHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
