import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/core/interface/employee.interface';
import * as fromAppState from 'src/app/store/app/app.reducer';
import * as fromEmployeeAction from 'src/app/store/employees/employee.action';
import * as fromEmployeeSelector from 'src/app/store/employees/employee.selector';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employee$!: Observable<Employee[]>;
  employee: Employee[] = [];

  // PAGINATION
  currentPage: number = 1;
  pageSize: number = 10;
  total: number = 0;
  from: number = 0;
  to: number = 0;
  pageSizeOptions: any[] = [5, 10, 15, 20];

  constructor(
    private store: Store<fromAppState.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hasQueryParams();
  }

  hasQueryParams() {
    this.route.queryParams.subscribe({
      next: (params) => {
        if (Object.keys(params).length) {
          this.pageSize = params['pageSize']
            ? params['pageSize']
            : this.pageSize;
          this.currentPage = params['page'] ? params['page'] : this.currentPage;
          this.getEmployees();
          return;
        }

        this.getEmployees();
      },
    });
  }

  getEmployees() {
    this.store.dispatch(fromEmployeeAction.LoadEmployees());
    this.employee$ = this.store.select(fromEmployeeSelector.getEmployees);

    this.employee$.subscribe({
      next: (res) => {
        this.total = res?.length;
        this.employee = this.paginateData(res);
      },
    });
  }

  paginateData(data: any) {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Number(startIndex) + Number(this.pageSize);
    const newData = data.slice(startIndex, endIndex);
    return newData;
  }

  onNavigatePage(page: any) {
    this.router.navigate(['/employees'], {
      queryParams: { page: page, pageSize: this.pageSize },
      queryParamsHandling: 'merge',
    });
  }

  onChangePageSize(size: any) {
    this.router.navigate(['/employees'], {
      queryParams: { pageSize: size, page: 1 },
      queryParamsHandling: 'merge',
    });
  }
}
