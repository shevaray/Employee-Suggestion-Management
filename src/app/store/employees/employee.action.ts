import { createAction, props } from '@ngrx/store';
import { Employee } from 'src/app/core/interface/employee.interface';

const LOAD_EMPLOYEES = 'employees load all';
const LOAD_EMPLOYEES_SUCCESS = 'employees load success';
const LOAD_EMPLOYEES_FAILED = 'employees load fail';

export const LoadEmployees = createAction(LOAD_EMPLOYEES);
export const LoadEmployeesSuccess = createAction(
  LOAD_EMPLOYEES_SUCCESS,
  props<{ data: Employee[] }>()
);
export const LoadEmployeesFail = createAction(
  LOAD_EMPLOYEES_FAILED,
  props<{ errMsg: string }>()
);
