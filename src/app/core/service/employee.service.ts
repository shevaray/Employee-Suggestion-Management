import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  loadEmployees() {
    return this.http
      .get('assets/json/sample-data.json')
      .pipe(map((res: any) => res?.employees));
  }
}
