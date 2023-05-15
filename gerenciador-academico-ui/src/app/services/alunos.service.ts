import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { enviroment } from '../enviroments/enviroments';
import { Observable } from 'rxjs';
import { IAlunosDto } from '../models/aluno.dto';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AlunosService {
  endpoint = 'alunos';
  endpointAlunos = 'alunos';
  endpointProfessores = 'professores';
  endpointAdministrador = 'admin';
  api = enviroment.api;
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  getAlunos(): Observable<any> {
    if(this.localStorageService.getData('role') === 'ROLE_PROFESSOR') {
      return this.http.get(`${this.api}/${this.endpointProfessores}`);
    }
    if(this.localStorageService.getData('role') === 'ROLE_ALUNO') {
      return this.http.get(`${this.api}/${this.endpointAlunos}`);
    }
    if(this.localStorageService.getData('role') === 'ROLE_ADMINISTRADOR') {
      return this.http.get(`${this.api}/${this.endpointAdministrador}/alunos`);
    }
    return new Observable<IAlunosDto>;
  }

  getAlunoPorMatricula(matricula: string): Observable<any> {
    return this.http.get(`${this.api}/${this.endpoint}/${matricula}`);
  }

  salvarAluno(alunoSaveDto: IAlunosDto): Observable<any> {
    return this.http.post(`${this.api}/${this.endpoint}/salvar`, alunoSaveDto);
  }

  atualizarAluno(matricula: string, alunoSaveDto: IAlunosDto): Observable<any> {
    return this.http.put(
      `${this.api}/${this.endpoint}/atualizar?matricula=${matricula}`,
      alunoSaveDto
    );
  }

  deletarAluno(matricula: string): Observable<any> {
    return this.http.delete(
      `${this.api}/${this.endpoint}/deletar?matricula=${matricula}`
    );
  }
}
