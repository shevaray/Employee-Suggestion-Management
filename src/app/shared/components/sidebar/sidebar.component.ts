import { Component, OnInit } from '@angular/core';
import { SIDEBAR_MENU } from 'src/app/core/config/sidebar-menu.config';

@Component({
  selector: 'esm-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menu: any[] = SIDEBAR_MENU;

  ngOnInit(): void {}
}
