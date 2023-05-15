import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IProfessorDto } from 'src/app/models/professor.dto';
import { openRoutes } from 'src/app/enviroments/global-variables';
import { ProfessoresService } from 'src/app/services/professores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit, OnChanges {
  title: string = 'Professores';
  professores: IProfessorDto[] = [];
  openRoutes: string[] = openRoutes;
  expectedRoutes: any;
  contentLoaded: boolean = false;
  contentWithError: boolean = false;
  messageContentError: string = '';

  constructor(
  private professoresService: ProfessoresService,
  private router: Router,
  private activatedRouter: ActivatedRoute,
  private authService: AuthService,
  private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.verifyAuthentication();

    if (this.router.url.includes('/dashboard/alunos/deletar/')) {
      this.deletar();
      return;
    }
    // carrega os dados
    this.getProfessores();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.verifyAuthentication();
  }

  goToCadastro() {
    this.router.navigate(['/dashboard/professores/cadastro']);
  }

  getProfessores(): void {
    this.professoresService.getProfessores().subscribe({
      next: (res: IProfessorDto[]) => {
        this.professores = res;
      },
      error: (e) => {
        if (e.error) {
          this.contentWithError = true;
          this.messageContentError = e.error.message ? e.error.message : 'Falha ao atualizar dados dos professores. Contate o administrador do sistema.';
        }
      },
      complete: () => {
        this.contentLoaded = true;
      },
    });
  }

  deletar(): void {
    const id: string =
      this.activatedRouter.snapshot.paramMap.get('id') ?? '';
    let btnConfirm: boolean = confirm(
      'Deseja realmente deletar o professor com ID: ' + id
    );
    if (btnConfirm) {
      this.professoresService.deletarProfessor(id).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/professores']);
        },
        error: (e) => {
        },
      });
    } else {
      this.router.navigate(['/dashboard/professores']);
    }
  }

  renderGoDashBoardProfessor() {
    this.verifyAuthentication();
    if(this.localStorageService.getData('role') === 'ROLE_ALUNO') {
      return false;
    }
    return true;
  }

  verifyAuthentication() {
    this.expectedRoutes = this.activatedRouter.snapshot.data;
    if (!this.authService.hasRequiredRoles(this.expectedRoutes.expectedRoles)) {
      this.authService.logout();
    }
  }


}
