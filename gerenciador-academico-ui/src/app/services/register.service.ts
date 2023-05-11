import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { enviroment } from '../enviroments/enviroments';
import { ILoginDto, IRegisterDto } from '../models/auth.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  endpoint = 'auth/register';
  api = enviroment.api;
  constructor(private http: HttpClient) {}

  register(registerDto: IRegisterDto): Observable<any> {
    return this.http.post(`${this.api}/${this.endpoint}`, registerDto);
  }
}
