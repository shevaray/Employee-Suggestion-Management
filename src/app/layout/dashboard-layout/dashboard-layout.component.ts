import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.onCheckScreenSize();
  }

  isCollapsed: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.onCheckScreenSize();
  }

  get pageTitle(): string {
    return this.router.url.split('/')[1];
  }

  onCollapseSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  onCheckScreenSize() {
    this.isCollapsed = window.screen.width <= 992 ? false : true;
  }
}
