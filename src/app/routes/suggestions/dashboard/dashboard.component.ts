import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  PRIORITIES,
  SOURCES,
  STATUSES,
  TYPES,
} from 'src/app/core/config/suggestions-filter-options.config';
import { Suggestion } from 'src/app/core/interface/suggestion.interface';
import * as fromAppState from 'src/app/store/app/app.reducer';
import * as fromSuggestionsAction from 'src/app/store/suggestions/suggestions.action';
import * as fromSuggestionsSelector from 'src/app/store/suggestions/suggestions.selector';
import * as fromEmployeeAction from 'src/app/store/employees/employee.action';
import * as fromEmployeeSelector from 'src/app/store/employees/employee.selector';
import { Employee } from 'src/app/core/interface/employee.interface';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StorageService } from 'src/app/core/service/storage.service';
import { StorageKeys } from 'src/app/core/enum/storage-keys.enum';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;

  // ARRAYS
  suggestions$!: Observable<Suggestion[]>;
  employees$!: Observable<Employee[]>;
  suggestions: Suggestion[] = [];
  employees: Employee[] = [];
  types: any[] = TYPES;
  priorities: any[] = PRIORITIES;
  statuses: any[] = STATUSES;
  sources: any[] = SOURCES;

  // BOOLEANS
  isActive: boolean = false;

  // STRINGS
  toolTipPlacement: string = 'topLeft';
  selectedSuggestionId!: string;
  selectedStatus!: string;

  // OBJECTS / ANT TYPE
  filterOptions: any = {};

  // FORM GROUPS
  filterByEmployeeForm!: FormGroup;
  filterByTypeForm!: FormGroup;
  filterByPriorityForm!: FormGroup;
  filterByStatusForm!: FormGroup;
  filterBySourceForm!: FormGroup;

  // PAGINATION
  currentPage: number = 1;
  pageSize: number = 10;
  total: number = 0;
  pageSizeOptions: any[] = [5, 10, 15, 20];

  constructor(
    private store: Store<fromAppState.AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NzModalService,
    private storageSrv: StorageService,
    private notifyServ: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.hasQueryParams();
    this.buildFilterByPriorityForm();
    this.buildFilterBySourceForm();
    this.buildFilterByStatusForm();
    this.buildFilterByTypeForm();
    this.buildFilterByEmployeeForm();
  }

  buildFilterByEmployeeForm() {
    this.filterByEmployeeForm = this.fb.group({
      employeeId: [''],
    });
  }

  buildFilterByTypeForm() {
    this.filterByTypeForm = this.fb.group({
      type: [''],
    });
  }

  buildFilterByPriorityForm() {
    this.filterByPriorityForm = this.fb.group({
      priority: [''],
    });
  }

  buildFilterBySourceForm() {
    this.filterBySourceForm = this.fb.group({
      source: [''],
    });
  }

  buildFilterByStatusForm() {
    this.filterByStatusForm = this.fb.group({
      status: [''],
    });
  }

  hasQueryParams() {
    this.route.queryParams.subscribe({
      next: (params) => {
        let queryParams: any = params;

        if (Object.keys(params).length) {
          this.pageSize = queryParams.pageSize;
          this.currentPage = queryParams.page;
        }

        this.filterData();
      },
    });
  }

  loadSuggestions() {
    this.store.dispatch(fromSuggestionsAction.LoadSuggestions());
    this.suggestions$ = this.store.select(
      fromSuggestionsSelector.getSuggestions
    );

    this.suggestions$.subscribe({
      next: (res) => {
        const newData = res.map((data) => {
          return { ...data, checked: false };
        });

        this.total = res?.length;
        this.suggestions = this.paginateData(newData);
      },
    });
  }

  loadEmployees() {
    this.store.dispatch(fromEmployeeAction.LoadEmployees());
    this.employees$ = this.store.select(fromEmployeeSelector.getEmployees);
    this.employees$.subscribe({
      next: (res) => {
        this.employees = res;
      },
    });
  }

  getEmployeeName(id: string): string {
    const employeeName = this.employees.filter(
      (employee) => employee.id == id
    )[0]?.name;
    return employeeName;
  }

  paginateData(data: any) {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Number(startIndex) + Number(this.pageSize);
    const newData = data.slice(startIndex, endIndex);
    return newData;
  }

  onNavigatePage(page: any) {
    this.router.navigate([], {
      queryParams: { page: page, pageSize: this.pageSize },
      queryParamsHandling: 'merge',
    });
  }

  onEditSuggestion(id: string) {
    this.router.navigate([`/suggestions/create-suggestion/${id}`]);
  }

  onChangePageSize(size: any) {
    this.router.navigate([], {
      queryParams: { page: 1, pageSize: size },
      queryParamsHandling: 'merge',
    });
  }

  onFilterByEmployee(evt: any) {
    if (!evt) {
      delete this.filterOptions['employeeId'];
      this.filterData();
      return;
    }

    this.filterOptions['employeeId'] = evt;
    this.filterData();
  }

  onFilterByType(evt: any) {
    if (!evt) {
      delete this.filterOptions['type'];
      this.filterData();
      return;
    }

    this.filterOptions['type'] = evt;
    this.filterData();
  }

  onFilterByPriority(evt: any) {
    if (!evt) {
      delete this.filterOptions['priority'];
      this.filterData();
      return;
    }

    this.filterOptions['priority'] = evt;
    this.filterData();
  }

  onFilterByStatus(evt: any) {
    if (!evt) {
      delete this.filterOptions['status'];
      this.filterData();
      return;
    }

    this.filterOptions['status'] = evt;
    this.filterData();
  }

  onFilterBySource(evt: any) {
    if (!evt) {
      delete this.filterOptions['source'];
      this.filterData();
      return;
    }

    this.filterOptions['source'] = evt;
    this.filterData();
  }

  filterData() {
    const filterOptions = this.filterOptions;
    const keys = Object.keys(filterOptions);

    if (!Object.keys(this.filterOptions).length) {
      this.loadSuggestions();
      return;
    }

    this.suggestions$.subscribe({
      next: (res) => {
        this.suggestions = res.filter((item: any) => {
          const matches = keys.every((key) => item[key] === filterOptions[key]);
          if (matches) {
            return item;
          }
          this.suggestions = this.paginateData(res);
        });

        this.total = this.suggestions?.length;
      },
    });
  }

  onSelectStatus(evnt: any) {
    this.selectedStatus = evnt;
  }

  openStatusModal(id: string) {
    this.selectedSuggestionId = id;

    this.modalService.confirm({
      nzTitle: 'Update Status',
      nzContent: this.modalContent,
      nzOkText: null,
      nzCancelText: null,
    });
  }

  onUpdateStatus() {
    this.suggestions.map((data: any) => {
      if (data.id == this.selectedSuggestionId) {
        data.status = this.selectedStatus;
        data.dateUpdated = new Date();
      }
    });

    this.storageSrv.setLocalStorageItem(StorageKeys.suggestions, [
      ...this.suggestions,
    ]);

    this.loadSuggestions();
    this.modalService.closeAll();
    this.notifyServ.success('Suggestions', 'Status successfully update!');
  }
}
