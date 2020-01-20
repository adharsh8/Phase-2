import { TestBed } from '@angular/core/testing';

import { EmployeestreamService } from './Data/employeestream.service';

describe('EmployeestreamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeestreamService = TestBed.get(EmployeestreamService);
    expect(service).toBeTruthy();
  });
});
