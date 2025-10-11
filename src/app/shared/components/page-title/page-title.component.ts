import { Component, Input, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/core/service/utility.service';

@Component({
  selector: 'esm-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent implements OnInit {
  @Input() PageTitle: string = 'page title';

  constructor(private utilitySrv: UtilityService) {}
  ngOnInit(): void {}

  onCollapseSidebar() {
    this.utilitySrv.toggleSidebar();
  }
}
