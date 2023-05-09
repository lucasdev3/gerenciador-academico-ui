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
  alunos: IAlunosDto[] = [];
  openRoutes: string[] = openRoutes;
  expectedRoutes: any;

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
      next: (res: IAlunosDto[]) => {
        this.alunos = res;
      },
      error: (e) => {
        console.log(e);
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
          console.log(e);
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
