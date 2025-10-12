import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionsComponent } from './suggestions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateSuggestionComponent } from './create-suggestion/create-suggestion.component';

const routes: Routes = [
  {
    path: '',
    component: SuggestionsComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          breadcrumb: 'Dashboard',
        },
      },
      {
        path: 'create-suggestion',
        component: CreateSuggestionComponent,
        data: {
          breadcrumb: 'create-suggestion',
        },
      },
      {
        path: 'create-suggestion/:id',
        component: CreateSuggestionComponent,
        data: {
          breadcrumb: 'update-suggestion',
        },
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuggestionsRoutingModule {}
