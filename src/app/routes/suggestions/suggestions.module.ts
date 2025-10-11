import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsComponent } from './suggestions.component';
import { SharedModule } from '@shared';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateSuggestionComponent } from './create-suggestion/create-suggestion.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [SuggestionsComponent, CreateSuggestionComponent, DashboardComponent],
  imports: [
    CommonModule,
    SuggestionsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SuggestionsModule {}
