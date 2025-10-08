import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [DashboardLayoutComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [DashboardLayoutComponent],
})
export class LayoutModule {}
