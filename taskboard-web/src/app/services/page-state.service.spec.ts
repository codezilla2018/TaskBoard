import { TestBed, inject } from '@angular/core/testing';

import { PageStateService } from './page-state.service';

describe('PageStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageStateService]
    });
  });

  it('should be created', inject([PageStateService], (service: PageStateService) => {
    expect(service).toBeTruthy();
  }));
});
