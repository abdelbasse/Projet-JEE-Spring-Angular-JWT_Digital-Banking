import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.backendHost}/api/dashboard`;

  constructor(private http: HttpClient) { }

  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }

  getRecentTransactions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recent-transactions`);
  }

  getDashboardCharts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/charts`);
  }
}