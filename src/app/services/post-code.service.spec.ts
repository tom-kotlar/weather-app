import { TestBed } from '@angular/core/testing';

import { PostCodeService } from './post-code.service';

describe('PostCodeService', () => {
  let service: PostCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
