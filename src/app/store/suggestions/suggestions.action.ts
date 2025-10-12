import { createAction, props } from '@ngrx/store';
import { Suggestion } from 'src/app/core/interface/suggestion.interface';

const LOAD_SUGGESTIONS = '[SUGGESTIONS] Load Suggestion';
const ADD_SUGGESTIONS = '[SUGGESTIONS]  Add Suggestion';
const UDPATE_SUGGESTIONS = '[SUGGESTIONS] Update Suggestion';
const LOAD_SUGGESTIONS_SUCCESS = '[SUGGESTIONS] Load Suggestion Success';
const LOAD_SUGGESTIONS_FAILED = '[SUGGESTIONS] Load Suggestion Fail';

export const LoadSuggestions = createAction(LOAD_SUGGESTIONS);

export const LoadSuggestionsSuccess = createAction(
  LOAD_SUGGESTIONS_SUCCESS,
  props<{ data: Suggestion[] }>()
);

export const LoadSuggestionsFail = createAction(
  LOAD_SUGGESTIONS_FAILED,
  props<{ errMsg: string }>()
);

export const AddSuggestion = createAction(
  ADD_SUGGESTIONS,
  props<{ payload: Suggestion }>()
);

export const UpdateSuggestions = createAction(
  UDPATE_SUGGESTIONS,
  props<{ payload: Suggestion }>()
);
