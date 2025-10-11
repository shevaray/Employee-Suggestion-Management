import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NG_ZORRO_MODULES } from './ng-zorro-modules.module';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { NoWrapDirective } from '../core/directives/no-wrap.directive';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    SidebarComponent,
    PageTitleComponent,
    BreadcrumbsComponent,
    NoWrapDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ...NG_ZORRO_MODULES,
    AngularSvgIconModule.forRoot(),
    FormsModule,
  ],
  exports: [
    ...NG_ZORRO_MODULES,
    SidebarComponent,
    AngularSvgIconModule,
    PageTitleComponent,
    NoWrapDirective,
    FormsModule,
    BreadcrumbsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
