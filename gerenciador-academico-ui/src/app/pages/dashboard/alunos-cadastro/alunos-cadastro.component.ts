import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlunosDto } from 'src/app/models/aluno.dto';
import { AlunosService } from 'src/app/services/alunos.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-alunos-cadastro',
  templateUrl: './alunos-cadastro.component.html',
  styleUrls: ['./alunos-cadastro.component.css'],
})
export class AlunosCadastroComponent implements OnInit {
  expectedRoutes: any;
  goToAlunos: boolean = true;
  novoAluno: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunosService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.novoAluno = this.formBuilder.group({
      matricula: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      dataNascimento: ['', Validators.required],
    });

    
  }
  ngOnInit(): void {
    this.verifyAuthentication();
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

  verifyAuthentication() {
    this.expectedRoutes = this.activatedRoute.snapshot.data;
    if (!this.authService.hasRequiredRoles(this.expectedRoutes.expectedRoles)) {
      this.authService.logout();
    }
  }

}
