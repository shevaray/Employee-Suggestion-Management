import { Component, HostListener, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/core/service/utility.service';

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
  constructor(private utilitySrv: UtilityService) {}

  isCollapsed: any;

  ngOnInit(): void {
    this.onCheckScreenSize();
  }

  onCheckScreenSize() {
    const condition = window.screen.width <= 992 ? false : true;
    this.utilitySrv.setCollapsed(condition);
    this.utilitySrv.isCollapsed$.subscribe(
      (value) => (this.isCollapsed = value)
    );
  }
}
