import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NG_ZORRO_MODULES } from './ng-zorro-modules.module';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, RouterModule, AngularSvgIconModule.forRoot()],
  exports: [...NG_ZORRO_MODULES, SidebarComponent, AngularSvgIconModule],
})
export class SharedModule {}
