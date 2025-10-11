import { createReducer, on } from '@ngrx/store';
import { Suggestion } from 'src/app/core/interface/suggestion.interface';
import {
  LoadSuggestionsFail,
  LoadSuggestionsSuccess,
} from './suggestions.action';

export interface State {
  data: Suggestion[];
  errorMessage: string;
}

export const suggestionState: State = {
  data: [],
  errorMessage: '',
};

const _suggestionsReducer = createReducer(
  suggestionState,
  on(LoadSuggestionsSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      errorMessage: '',
    };
  }),
  on(LoadSuggestionsFail, (state, action) => {
    return {
      ...state,
      data: [],
      errorMessage: action.errMsg,
    };
  })
);

export function suggestionsReducer(state: any, action: any) {
  return _suggestionsReducer(state, action);
}
