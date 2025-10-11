import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  suggestions$!: Observable<Suggestion[]>;
  suggestions: Suggestion[] = [];
  types: any[] = TYPES;
  priorities: any[] = PRIORITIES;
  statuses: any[] = STATUSES;
  sources: any[] = SOURCES;
  selectedSuggestion: any[] = [];
  filterOptions: any = {};
  toolTipPlacement: string = 'bottom';
  isChecked: boolean = false;
  isActive: boolean = false;

  // FORM GROUPS
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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.hasQueryParams();
    this.buildFilterByPriorityForm();
    this.buildFilterBySourceForm();
    this.buildFilterByStatusForm();
    this.buildFilterByTypeForm();
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

  getSuggestions() {
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
        console.log(this.suggestions);
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
    this.router.navigate([], {
      queryParams: { page: page, pageSize: this.pageSize },
      queryParamsHandling: 'merge',
    });
  }

  onChangePageSize(size: any) {
    this.router.navigate([], {
      queryParams: { page: 1, pageSize: size },
      queryParamsHandling: 'merge',
    });
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
      this.getSuggestions();
      return;
    }

    this.suggestions$.subscribe({
      next: (res) => {
        // Appends checked property to the data
        const newData = res.map((data) => {
          return { ...data, checked: false };
        });

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

  onItemChecked(value: any, event: any) {
    let maxItem = 1;
    if (event.target.checked) {
      this.selectedSuggestion.push(value);
      this.isChecked = true;

      if (this.selectedSuggestion.length > maxItem) {
        this.selectedSuggestion[0].checked = false;
        this.selectedSuggestion.splice(0, 1);
      }
    } else {
      for (let i = 0; i < this.selectedSuggestion.length; i++) {
        if (this.selectedSuggestion[i] === value) {
          this.selectedSuggestion.splice(i, 1);
        }
      }

      this.isChecked = false;
      this.isActive = false;
    }
  }
}
