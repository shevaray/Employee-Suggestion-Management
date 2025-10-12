import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SuggestionsService } from 'src/app/core/service/suggestions.service';
import {
  LoadSuggestions,
  LoadSuggestionsFail,
  LoadSuggestionsSuccess,
} from './suggestions.action';
import { catchError, debounceTime, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class SuggestionsEffects {
  constructor(
    private suggestionSrv: SuggestionsService,
    private actions$: Actions
  ) {}

  getSuggestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadSuggestions),
      exhaustMap((action) => {
        return this.suggestionSrv.loadSuggestions().pipe(
          map((data) => {
            return LoadSuggestionsSuccess({ data: data });
          }),
          catchError((err) => of(LoadSuggestionsFail({ errMsg: err })))
        );
      })
    )
  );
}
