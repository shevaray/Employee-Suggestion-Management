import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  TYPES,
  PRIORITIES,
  STATUSES,
  SOURCES,
} from 'src/app/core/config/suggestions-filter-options.config';
import { StorageKeys } from 'src/app/core/enum/storage-keys.enum';
import { Suggestion } from 'src/app/core/interface/suggestion.interface';
import { StorageService } from 'src/app/core/service/storage.service';
import * as fromAppState from 'src/app/store/app/app.reducer';
import * as fromSuggestionsAction from 'src/app/store/suggestions/suggestions.action';
import * as fromSuggestionsSelector from 'src/app/store/suggestions/suggestions.selector';
import * as fromEmployeeAction from 'src/app/store/employees/employee.action';
import * as fromEmployeeSelector from 'src/app/store/employees/employee.selector';
import { Employee } from 'src/app/core/interface/employee.interface';
import { NotificationService } from 'src/app/core/service/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-suggestion',
  templateUrl: './create-suggestion.component.html',
  styleUrls: ['./create-suggestion.component.scss'],
})
export class CreateSuggestionComponent implements OnInit {
  suggestions$!: Observable<Suggestion[]>;
  employees$!: Observable<Employee[]>;
  suggestions: Suggestion[] = [];
  employees: Employee[] = [];
  types: any[] = TYPES;
  priorities: any[] = PRIORITIES;
  statuses: any[] = STATUSES;
  sources: any[] = SOURCES;
  toolTipPlacement: string = 'topLeft';
  routeId!: String;
  btnTextPrefix: string = 'create';

  // FORM GROUP
  suggestionForm!: FormGroup;
  date: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private store: Store<fromAppState.AppState>,
    private storageSrv: StorageService,
    private notifyServ: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildSuggestionForm();
    this.loadSuggestions();
    this.loadEmployees();
    this.hasParams();
  }

  buildSuggestionForm() {
    const maxNum = 10000000;
    this.suggestionForm = this.fb.group({
      id: [`${Math.floor(Math.random() * maxNum)}`, Validators.required],
      employeeId: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      source: ['admin', Validators.required],
      dateCreated: [this.date, Validators.required],
      dateUpdated: [this.date, Validators.required],
      notes: [''],
    });
  }

  hasParams() {
    this.routeId = this.route.snapshot.params['id'];
    if (this.routeId) {
      this.patchSuggestionForm();
      this.btnTextPrefix = 'update';
    }
  }

  loadSuggestions() {
    this.store.dispatch(fromSuggestionsAction.LoadSuggestions());
    this.suggestions$ = this.store.select(
      fromSuggestionsSelector.getSuggestions
    );
    this.suggestions$.subscribe({
      next: (res) => {
        this.suggestions = res;
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

  patchSuggestionForm() {
    const data = this.suggestions.filter((data) => data.id == this.routeId);
    if (!data?.length) {
      this.notifyServ.error(
        'Suggestions',
        'Suggestion not found. Please create a new suggestion.'
      );
      this.router.navigate(['/suggestions/create-suggestion']);
      return;
    }

    this.suggestionForm.patchValue({
      id: data[0].id,
      employeeId: data[0].employeeId,
      type: data[0].type,
      description: data[0].description,
      status: data[0].status,
      priority: data[0].priority,
      source: data[0].source,
      dateCreated: data[0].dateCreated,
      dateUpdated: new Date(),
      notes: data[0].notes,
    });
  }

  onUpdateSuggetions() {
    const newData = this.suggestionForm.value;
    this.suggestions = this.suggestions.map((data: any) => {
      return data.id === newData?.id ? { ...newData } : data;
    });

    this.storageSrv.setLocalStorageItem(
      StorageKeys.suggestions,
      this.suggestions
    );
  }

  onCreateSuggetions() {
    this.storageSrv.setLocalStorageItem(StorageKeys.suggestions, [
      this.suggestionForm.value,
      ...this.suggestions,
    ]);
  }

  onSubmit() {
    if (this.routeId) {
      this.onUpdateSuggetions();
      this.notifyServ.success('Suggestion', 'Successfully Updated!');
      this.router.navigate(['/suggestions/create-suggestion']);
    } else {
      this.onCreateSuggetions();
      this.notifyServ.success('Suggestion', 'Successfully Created!');
    }

    this.suggestionForm.reset();
  }
}
