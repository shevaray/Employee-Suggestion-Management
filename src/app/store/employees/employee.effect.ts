import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, of } from 'rxjs';
import {
  LoadEmployees,
  LoadEmployeesFail,
  LoadEmployeesSuccess,
} from './employee.action';
import { EmployeeService } from 'src/app/core/service/employee.service';

@Injectable()
export class EmployeesEffects {
  constructor(
    private employeeSrv: EmployeeService,
    private actions$: Actions
  ) {}

  getSuggestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadEmployees),
      exhaustMap((action) => {
        return this.employeeSrv.loadEmployees().pipe(
          map((data) => {
            return LoadEmployeesSuccess({ data: data });
          }),
          catchError((err) => of(LoadEmployeesFail({ errMsg: err })))
        );
      })
    )
  );
}
