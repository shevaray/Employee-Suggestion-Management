import { createAction, props } from '@ngrx/store';
import { Employee } from 'src/app/core/interface/employee.interface';

const LOAD_EMPLOYEES = '[EMPLOYEES] Load Employees';
const LOAD_EMPLOYEES_SUCCESS = '[EMPLOYEES] Load Employees Success';
const LOAD_EMPLOYEES_FAILED = '[EMPLOYEES] Load Employees Fail';

export const LoadEmployees = createAction(LOAD_EMPLOYEES);
export const LoadEmployeesSuccess = createAction(
  LOAD_EMPLOYEES_SUCCESS,
  props<{ data: Employee[] }>()
);
export const LoadEmployeesFail = createAction(
  LOAD_EMPLOYEES_FAILED,
  props<{ errMsg: string }>()
);
