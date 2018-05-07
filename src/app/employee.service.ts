import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment.prod';

import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { Employee } from './core/model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private static PATH: string = 'employee';

  constructor(private httpClient: HttpClient) { }

  public getEmployees(skills: string[] = []): Observable<Employee[]> {
    let params = new HttpParams();
    if (skills && skills.length) {
      skills.forEach(skill => {
        params = params.append('skills', skill);
      });
    }

    return this.httpClient
      .get<Employee[]>(`${environment.backendUrl}${EmployeeService.PATH}`, {
        params: params
      });

  }
}
