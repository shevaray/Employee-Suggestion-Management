import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  // LOCAL STORAGE
  getLocalStorageItem(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }

  setLocalStorageItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeLocalStorageItem(key: string) {
    localStorage.removeItem(key);
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  // SESSION STORAGE

  getSessionStorageItem(key: string) {
    return JSON.parse(sessionStorage.getItem(key)!);
  }

  setSessionStorageItem(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  removeSessionStorageItem(key: string) {
    sessionStorage.removeItem(key);
  }

  clearSessionStorage() {
    sessionStorage.clear();
  }
}
