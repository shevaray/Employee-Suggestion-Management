import { Component, OnInit } from '@angular/core';
import { SuggestionsService } from './core/service/suggestions.service';
import { EmployeeService } from './core/service/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Employee-Suggestion-Management';

  constructor(
    private suggestionSrv: SuggestionsService,
    private employeeSrv: EmployeeService
  ) {}

  ngOnInit(): void {
    this.suggestionSrv.loadSuggestions().subscribe((res: any) => {
      console.log(res);
    });

    this.employeeSrv.loadEmployees().subscribe((res: any) => {
      console.log(res);
    });
  }
}
