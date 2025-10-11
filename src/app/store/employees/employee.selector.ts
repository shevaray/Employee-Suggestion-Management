import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEmployee from '../employees/employee.reducer';

const getEmployeesState =
  createFeatureSelector<fromEmployee.State>('employees');

export const getEmployees = createSelector(getEmployeesState, (state) => {
  return state.data;
});

export const getErrorMessage = createSelector(getEmployeesState, (state) => {
  return state.errorMessage;
});
