import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { enviroment } from '../enviroments/enviroments';
import { Observable } from 'rxjs';
import { IAlunosDto } from '../models/aluno.dto';
import { IProfessorDto, IProfessorSaveDto } from '../models/professor.dto';

@Injectable({
  providedIn: 'root',
})
export class ProfessoresService {
  endpoint = 'professores';
  api = enviroment.api;
  constructor(private http: HttpClient) {}

  getProfessores(): Observable<any> {
    return this.http.get(`${this.api}/${this.endpoint}`);
  }

  getProfessorPeloId(id: string): Observable<any> {
    return this.http.get(`${this.api}/${this.endpoint}/${id}`);
  }

  salvarProfessor(professorSaveDto: IProfessorSaveDto): Observable<any> {
    return this.http.post(`${this.api}/${this.endpoint}/salvar`, professorSaveDto);
  }

  atualizarProfessor(id: string, professorSaveDto: IProfessorSaveDto): Observable<any> {
    return this.http.put(
      `${this.api}/${this.endpoint}/atualizar?id=${id}`,
      professorSaveDto
    );
  }

  deletarProfessor(id: string): Observable<any> {
    return this.http.delete(
      `${this.api}/${this.endpoint}/deletar?id=${id}`
    );
  }
}
