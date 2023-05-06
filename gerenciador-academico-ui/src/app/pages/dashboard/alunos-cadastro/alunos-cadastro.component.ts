import { Component } from '@angular/core';

@Component({
  selector: 'app-alunos-cadastro',
  templateUrl: './alunos-cadastro.component.html',
  styleUrls: ['./alunos-cadastro.component.css'],
})
export class AlunosCadastroComponent {
  title: string = 'Alunos';
  goToAlunos: boolean = true;
  constructor() {}
}
