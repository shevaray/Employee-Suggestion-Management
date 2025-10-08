import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuggestionsService {
  constructor(private http: HttpClient) {}

  loadSuggestions() {
    return this.http
      .get('assets/json/sample-data.json')
      .pipe(map((res: any) => res?.suggestions));
  }
}
