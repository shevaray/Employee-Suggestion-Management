import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, map, of, shareReplay, tap, toArray } from 'rxjs';
import { StorageService } from './storage.service';
import { StorageKeys } from '../enum/storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class SuggestionsService {
  constructor(private http: HttpClient, private storageSrv: StorageService) {}
  storageData = this.storageSrv.getLocalStorageItem(StorageKeys.suggestions);

  hasLocalStorageData(): boolean {
    return !this.storageData ? false : true;
  }

  loadSuggestions() {
    const localData = this.hasLocalStorageData()
      ? this.storageSrv.getLocalStorageItem(StorageKeys.suggestions)
      : null;

    if (localData) {
      return of(localData);
    }

    return this.http
      .get<{ suggestions: any[] }>('assets/json/sample-data.json')
      .pipe(
        map((res) => res?.suggestions ?? []),
        tap((suggestions) => {
          this.storageSrv.setLocalStorageItem(
            StorageKeys.suggestions,
            suggestions
          );
        }),
        shareReplay(1) // cache the result for multiple subscribers
      );
  }
}
