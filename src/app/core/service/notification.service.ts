import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notifySrv: NzNotificationService) {}

  success(title: string, content: string): void {
    this.notifySrv.create('success', title, content, {
      nzDuration: 3000,
      nzAnimate: true,
    });
  }

  error(title: string, content: string): void {
    this.notifySrv.create('error', title, content, {
      nzDuration: 3000,
      nzAnimate: true,
    });
  }

  info(title: string, content: string): void {
    this.notifySrv.create('info', title, content, {
      nzDuration: 3000,
      nzAnimate: true,
    });
  }

  warning(title: string, content: string): void {
    this.notifySrv.create('warning', title, content, {
      nzDuration: 3000,
      nzAnimate: true,
    });
  }
}
