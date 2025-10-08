import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'suggestions',
    pathMatch: 'full',
  },
  {
    path: 'suggestions',
    loadChildren: () =>
      import('./suggestions/suggestions-routing.module').then(
        (m) => m.SuggestionsRoutingModule
      ),
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('./employees/employees-routing.module').then(
        (m) => m.EmployeesRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
