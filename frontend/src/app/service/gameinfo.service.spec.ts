import { TestBed } from '@angular/core/testing';

import { GameinfoService } from './gameinfo.service';

describe('GameinfoService', () => {
  let service: GameinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
