import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { enviroment } from '../enviroments/enviroments';
import { ILoginDto } from '../models/login.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  endpoint = 'auth/login';
  api = enviroment.api;
  constructor(private http: HttpClient) {}

  login(loginDto: ILoginDto): Observable<any> {
    return this.http.post(`${this.api}/${this.endpoint}`, loginDto);
  }
}
