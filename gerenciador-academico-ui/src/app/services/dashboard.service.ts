import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { enviroment } from '../enviroments/enviroments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  endpoint = 'admin';
  api = enviroment.api;
  constructor(private http: HttpClient) {}

  getDashboard(): Observable<any> {
    return this.http.get(`${this.api}/${this.endpoint}`);
  }
}
