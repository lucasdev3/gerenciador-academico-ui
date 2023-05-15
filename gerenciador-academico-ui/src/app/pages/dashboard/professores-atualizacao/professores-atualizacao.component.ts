import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProfessorDto, IProfessorSaveDto } from 'src/app/models/professor.dto';
import { AuthService } from 'src/app/services/auth.service';
import { ProfessoresService } from 'src/app/services/professores.service';

@Component({
  selector: 'app-professores-atualizacao',
  templateUrl: './professores-atualizacao.component.html',
  styleUrls: ['./professores-atualizacao.component.css']
})
export class ProfessoresAtualizacaoComponent implements OnInit, OnChanges{

  expectedRoutes: any;

  id: string = '';

  goToAlunos: boolean = true;
  atualizarAluno: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private professoresService: ProfessoresService,
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
    this.id =
      this.activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.verifyAuthentication();
  }

  atualizar(professor: IProfessorSaveDto) {
    this.professoresService.atualizarProfessor(this.id, professor).subscribe({
      next: (res) => {
        if (res.message === 'Professor atualizado com sucesso!') {
          alert('Professor atualizado com sucesso!');
          this.router.navigate(['/dashboard/professores']);
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
