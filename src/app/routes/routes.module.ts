import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { EmployeesModule } from './employees/employees.module';
import { SuggestionsModule } from './suggestions/suggestions.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    SuggestionsModule,
    EmployeesModule,
  ],
})
export class RoutesModule {}
