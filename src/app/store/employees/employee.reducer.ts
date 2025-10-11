import { createReducer, on } from '@ngrx/store';
import { Employee } from 'src/app/core/interface/employee.interface';
import {
  LoadSuggestionsFail,
  LoadSuggestionsSuccess,
} from '../suggestions/suggestions.action';
import { LoadEmployeesFail, LoadEmployeesSuccess } from './employee.action';

export interface State {
  data: Employee[];
  errorMessage: string;
}

export const employeesState: State = {
  data: [],
  errorMessage: '',
};

const _employeesReducer = createReducer(
  employeesState,
  on(LoadEmployeesSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      errorMessage: '',
    };
  }),
  on(LoadEmployeesFail, (state, action) => {
    return {
      ...state,
      data: [],
      errorMessage: action.errMsg,
    };
  })
);

export function employeesReducer(state: any, action: any) {
  return _employeesReducer(state, action);
}
