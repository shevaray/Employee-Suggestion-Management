import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  private collapsed = new BehaviorSubject<boolean>(false);
  isCollapsed$ = this.collapsed.asObservable();

  constructor() {}

  toggleSidebar(): void {
    this.collapsed.next(!this.collapsed.value);
  }

  setCollapsed(value: boolean): void {
    this.collapsed.next(value);
  }
}
