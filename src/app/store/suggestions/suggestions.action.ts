import { createAction, props } from '@ngrx/store';
import { Suggestion } from 'src/app/core/interface/suggestion.interface';

const LOAD_SUGGESTIONS = 'suggestions load all';
const LOAD_SUGGESTIONS_SUCCESS = 'suggestions load success';
const LOAD_SUGGESTIONS_FAILED = 'suggestions load fail';

export const LoadSuggestions = createAction(LOAD_SUGGESTIONS);
export const LoadSuggestionsSuccess = createAction(
  LOAD_SUGGESTIONS_SUCCESS,
  props<{ data: Suggestion[] }>()
);
export const LoadSuggestionsFail = createAction(
  LOAD_SUGGESTIONS_FAILED,
  props<{ errMsg: string }>()
);
