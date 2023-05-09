import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlunosDto } from 'src/app/models/aluno.dto';
import { AlunosService } from 'src/app/services/alunos.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-alunos-atualizacao',
  templateUrl: './alunos-atualizacao.component.html',
  styleUrls: ['./alunos-atualizacao.component.css'],
})
export class AlunosAtualizacaoComponent implements OnInit, OnChanges {
  expectedRoutes: any;

  matricula: string = '';

  goToAlunos: boolean = true;
  atualizarAluno: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunosService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.atualizarAluno = this.formBuilder.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.verifyAuthentication();
    this.matricula =
      this.activatedRoute.snapshot.paramMap.get('matricula') ?? '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.verifyAuthentication();
  }

  atualizar(aluno: IAlunosDto) {
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

  verifyAuthentication() {
    this.expectedRoutes = this.activatedRoute.snapshot.data;
    if (!this.authService.hasRequiredRoles(this.expectedRoutes.expectedRoles)) {
      this.authService.logout();
    }
  }
}
