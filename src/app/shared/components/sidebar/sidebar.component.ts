import { Component, OnInit } from '@angular/core';
import { SIDEBAR_MENU } from 'src/app/core/config/sidebar-menu.config';

@Component({
  selector: 'esm-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menu: any[] = SIDEBAR_MENU;
  isShowSiderbar: boolean = false;

  ngOnInit(): void {}

  toggleDropdown(option: any) {
    option.collapsed = !option.collapsed;
    const screenSize = window.screen.width;

    if (option.collapsed && screenSize >= 992) {
      this.isShowSiderbar = false;
      // this.storageSrv.SetItem('sidebarToggle', this.isShowSiderbar);
      // this.showSiderbar.emit(this.isShowSiderbar);
    }
  }
}
