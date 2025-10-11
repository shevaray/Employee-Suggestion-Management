import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSuggestions from '../suggestions/suggestions.reducer';

const getSuggestionsState =
  createFeatureSelector<fromSuggestions.State>('suggestions');

export const getSuggestions = createSelector(getSuggestionsState, (state) => {
  return state.data;
});

export const getErrorMessage = createSelector(getSuggestionsState, (state) => {
  return state.errorMessage;
});
