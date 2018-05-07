import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { EmployeeService } from './employee.service';
import { Employee } from './core/model/Employee';

import { Observable } from 'rxjs';

import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employees';

  private _employees: Observable<Employee[]>;
  private searchInput: FormControl;

  constructor(private employeesService: EmployeeService) {

  }

  ngOnInit() {
    this.searchInput = new FormControl();
    this.searchInput.valueChanges
      .pipe(
        debounceTime(400)
      )
      .pipe(
        distinctUntilChanged()
      ).pipe(
        map((input: string) => {
          let inputArray;
          if (input.length > 0) {
            inputArray = input.split(',')
              .map(text => text.trim());
          }
          return this.employeesService.getEmployees(inputArray);
        })
      )
      .subscribe(employees => this._employees = employees); // Need to call subscribe to make it hot!
  }

  public get employees(): Observable<Employee[]> {
    if (!this._employees) {
      this._employees = this.employeesService.getEmployees();
    }
    return this._employees;
  }
}
