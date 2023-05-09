import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlunosDto } from 'src/app/models/aluno.dto';
import { AlunosService } from 'src/app/services/alunos.service';

@Component({
  selector: 'app-alunos-cadastro',
  templateUrl: './alunos-cadastro.component.html',
  styleUrls: ['./alunos-cadastro.component.css'],
})
export class AlunosCadastroComponent implements OnInit {
  matricula: string = '';
  goToAlunos: boolean = true;
  novoAluno: FormGroup;
  atualizarAluno: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.novoAluno = this.formBuilder.group({
      matricula: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      dataNascimento: ['', Validators.required],
    });

    this.atualizarAluno = this.formBuilder.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.matricula =
      this.activatedRoute.snapshot.paramMap.get('matricula') ?? '';
  }

  // Recebe os dados do componente filho
  salvar(aluno: IAlunosDto) {
    this.alunoService.salvarAluno(aluno).subscribe({
      next: (res) => {
        if (res.message === 'Aluno salvo com sucesso!') {
          alert('Aluno salvo com sucesso!');
          this.router.navigate(['/dashboard/alunos']);
        }
      },
      error: (e) => {
        if (e.error.message.errors) {
          let messageErrors = '';
          for (let error of e.error.message.errors) {
            messageErrors += error + '\n';
          }
          alert(messageErrors);
        }
        if (e.error.message) {
          alert(e.error.message);
        }
      },
    });
  }

  atualizar() {
    const aluno: IAlunosDto = this.atualizarAluno.value as IAlunosDto;
    this.alunoService.atualizarAluno(this.matricula, aluno).subscribe({
      next: (res) => {
        if (res.message === 'Aluno atualizado com sucesso!') {
          alert('Aluno atualizado com sucesso!');
          this.router.navigate(['/dashboard/alunos']);
        }
      },
      error: (e) => {
        if (e.error.message.errors) {
          let messageErrors = '';
          for (let error of e.error.message.errors) {
            messageErrors += error + '\n';
          }
          alert(messageErrors);
        }
      },
    });
  }

  deletar() {}
}
