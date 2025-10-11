import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as AppActions from '../app/app.action';
import * as fromSuggestions from '../suggestions/suggestions.reducer';
import * as fromEmployees from '../employees/employee.reducer';

export interface AppState {
  suggestions: fromSuggestions.State;
  employees: fromEmployees.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  suggestions: fromSuggestions.suggestionsReducer,
  employees: fromEmployees.employeesReducer,
};

export function resetStoreMetaReducer<State extends {}>(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return (state, action) => {
    if (action !== null && action.type === AppActions.ResetAllStores.type) {
      state = {} as State; // ==> Emptying state here
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [resetStoreMetaReducer];
