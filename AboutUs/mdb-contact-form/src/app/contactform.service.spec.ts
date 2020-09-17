import { TestBed } from '@angular/core/testing';

import { ContactformService } from './contactform.service';

describe('ContactformService', () => {
  let service: ContactformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
