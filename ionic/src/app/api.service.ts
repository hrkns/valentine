import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL: string;
  private endpoints;

  constructor(
    private http: HttpClient
  ) {

    this.API_URL = `${window.location.protocol}//${window.location.hostname}:3000/`;
    this.endpoints = {
      getWorkPeriodsStartDate : 'getWorkPeriodsStartDate',
      setWorkPeriodsStartDate : 'setWorkPeriodsStartDate',
    };
  }

  getWorkPeriodsStartDate(): Observable<object> {

    return this.http.post(this.API_URL + this.endpoints.getWorkPeriodsStartDate, {});
  }
}
