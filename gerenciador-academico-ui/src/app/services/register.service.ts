import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { enviroment } from '../enviroments/enviroments';
import { IRegisterDto } from '../models/auth.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  endpointAlunos = 'alunos/salvar';
  endpointProfessores = 'professores/salvar';
  api = enviroment.api;
  constructor(private http: HttpClient) {}

  register(registerDto: IRegisterDto): Observable<any> {
    if(registerDto.registerUsuarioDto.role === 'ROLE_PROFESSOR') {
      return this.http.post(`${this.api}/${this.endpointProfessores}`, registerDto);
    }
    if(registerDto.registerUsuarioDto.role === 'ROLE_ALUNO') {
      return this.http.post(`${this.api}/${this.endpointAlunos}`, registerDto);
    }
    return new Observable<IRegisterDto>;
  }
}
