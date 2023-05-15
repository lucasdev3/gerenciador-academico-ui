import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlunosDto } from 'src/app/models/aluno.dto';
import { AlunosService } from 'src/app/services/alunos.service';
import { AuthService } from 'src/app/services/auth.service';
import { openRoutes } from 'src/app/enviroments/global-variables';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css'],
})
export class AlunosComponent implements OnInit, OnChanges {
  title: string = 'Alunos';
  aluno: IAlunosDto = new Object() as IAlunosDto; 
  openRoutes: string[] = openRoutes;
  expectedRoutes: any;
  contentLoaded: boolean = false;
  contentWithError: boolean = false;
  messageContentError: string = '';

  constructor(
    private alunoService: AlunosService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.verifyAuthentication();

    if (this.router.url.includes('/dashboard/alunos/deletar/')) {
      this.deletar();
      return;
    }
    // carrega os dados
    this.getAlunos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.verifyAuthentication();
  }

  goToCadastro() {
    this.router.navigate(['/dashboard/alunos/cadastro']);
  }

  getAlunos(): void {
    this.alunoService.getAlunos().subscribe({
      next: (res: IAlunosDto) => {
        console.log(res)
        this.aluno = res;
      },
      error: (e) => {
        if (e.error) {
          this.contentWithError = true;
          this.messageContentError = e.error.message ? e.error.message : 'Falha ao atualizar dados dos alunos. Contate o administrador do sistema.';
        }
      },
      complete: () => {
        this.contentLoaded = true;
      },
    });
  }

  deletar(): void {
    const matricula: string =
      this.activatedRouter.snapshot.paramMap.get('matricula') ?? '';
    let btnConfirm: boolean = confirm(
      'Deseja realmente deletar o aluno com matricula: ' + matricula
    );
    if (btnConfirm) {
      this.alunoService.deletarAluno(matricula).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/alunos']);
        },
        error: (e) => {
        },
      });
    } else {
      this.router.navigate(['/dashboard/alunos']);
    }
  }

  verifyAuthentication() {
    this.expectedRoutes = this.activatedRouter.snapshot.data;
    if (!this.authService.hasRequiredRoles(this.expectedRoutes.expectedRoles)) {
      this.authService.logout();
    }
  }
}
