import { TestBed } from '@angular/core/testing';

import { NodeServerApiService } from './node-server-api.service';

describe('NodeServerApiService', () => {
  let service: NodeServerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeServerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
