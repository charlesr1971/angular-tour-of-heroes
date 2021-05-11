import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  it('should be created', inject([UtilsService], (service: UtilsService) => {
    expect(service).toBeTruthy();
  }));
});
