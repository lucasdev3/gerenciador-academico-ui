import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { enviroment } from '../enviroments/enviroments';
import { Observable } from 'rxjs';
import { IAlunosDto } from '../models/aluno.dto';

@Injectable({
  providedIn: 'root',
})
export class AlunosService {
  endpoint = 'alunos';
  api = enviroment.api;
  constructor(private http: HttpClient) {}

  getAlunos(): Observable<any> {
    return this.http.get(`${this.api}/${this.endpoint}`);
  }

  getAlunoPorMatricula(matricula: string): Observable<any> {
    return this.http.get(`${this.api}/${this.endpoint}/${matricula}`);
  }

  salvarAluno(alunoSaveDto: IAlunosDto): Observable<any> {
    return this.http.post(`${this.api}/${this.endpoint}/salvar`, alunoSaveDto);
  }

  atualizarAluno(matricula: string, alunoSaveDto: IAlunosDto): Observable<any> {
    return this.http.put(`${this.api}/${this.endpoint}/atualizar?matricula=${matricula}`, alunoSaveDto);
  }

  deletarAluno(matricula: string): Observable<any> {
    return this.http.delete(`${this.api}/${this.endpoint}/deletar?matricula=${matricula}`);
  }
  
}
