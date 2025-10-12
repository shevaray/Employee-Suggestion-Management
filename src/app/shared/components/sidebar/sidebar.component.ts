import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';
import { SIDEBAR_MENU } from 'src/app/core/config/sidebar-menu.config';
import { UtilityService } from 'src/app/core/service/utility.service';

@Component({
  selector: 'esm-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.onCheckScreenSize();
  }

  menu: any[] = SIDEBAR_MENU;
  isCollapsed!: boolean;

  constructor(private router: Router, private utilitySrv: UtilityService) {}

  ngOnInit(): void {
    this.onCheckScreenSize();
    this.isChildNavActive();
    this.isChildNavActiveOnRoute();
  }

  onCheckScreenSize() {
    const condition = window.screen.width <= 992 ? false : true;
    this.utilitySrv.setCollapsed(condition);
    this.utilitySrv.isCollapsed$.subscribe(
      (value) => (this.isCollapsed = value)
    );
  }

  toggleDropdown(option: any) {
    option.collapsed = !option.collapsed;
  }

  isChildNavActiveOnRoute() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe((event: any) => {
        const currentParentUrl = event?.urlAfterRedirects.split('/')[1];
        this.isChildNavActive(currentParentUrl);
      });
  }

  isChildNavActive(url?: any) {
    const currentParentUrl = url ? url : this.router.url.split('/')[1];

    this.menu.map((option) => {
      if (option.option?.toLowerCase() === currentParentUrl) {
        option.isChildActive = true;
        option.collapsed = true;
      } else {
        option.isChildActive = false;
      }
    });
  }
}
