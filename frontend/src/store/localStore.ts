'use client';

export class LocalStore {
  static get(key: string) {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return '';
  }

  static reload(){
    if (typeof window !== 'undefined') {
      window.location.href="/auth";
    }
  }

  static reloadLead(){
    if (typeof window !== 'undefined') {
      window.location.href="/dashboard/leads";
    }
  }

  static reloadDashboard(){
    if (typeof window !== 'undefined') {
      window.location.href="/dashboard/";
    }
  }

  static set(key: string, value: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  static remove(key: 'jwt' | string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  static clear() {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  }

  static getJson(key: string) {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  }

  static getAccessToken() {
    return this.get('jwt');
  }

  static setAccessToken(token: string) {
    this.set('jwt', token);
  }

  static getVerticalNavBarState() {
    return this.get('state')
  }

  static setVerticalNavBarState(state: string) {
    this.set('state', state)
  }
  
  static getFilters() {
    return this.getJson('filters') || {};
  }

  static setFilters(filters: { [property: string]: string }) {
    this.set('filters', JSON.stringify(filters));
  }
}