import { TestBed, inject } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('EmployeeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient, EmployeeService]
    });
  });

  it('should be created', inject([EmployeeService], (service: EmployeeService) => {
    expect(service).toBeTruthy();
  }));

  it('should return 4 Employees', inject([EmployeeService], (service: EmployeeService)=>{
      service.getEmployees().subscribe(data=> {
        expect(data.length).toBe(4);
      })
  }));

  it('should return 0 Employees', inject([EmployeeService], (service: EmployeeService)=>{
      service.getEmployees(['python']).subscribe(data=> {
        expect(data.length).toBe(0);
      })
  }));

  it('should return 2 Employees', inject([EmployeeService], (service: EmployeeService)=>{
      service.getEmployees(['DevOps']).subscribe(data=> {
        expect(data.length).toBe(2);
        expect(data[0].name).toBe("Jose Carlos");
      })
  }));

});
