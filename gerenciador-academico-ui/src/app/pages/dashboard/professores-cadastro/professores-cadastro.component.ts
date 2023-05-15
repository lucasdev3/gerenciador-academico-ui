import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProfessorSaveDto } from 'src/app/models/professor.dto';
import { AuthService } from 'src/app/services/auth.service';
import { ProfessoresService } from 'src/app/services/professores.service';

@Component({
  selector: 'app-professores-cadastro',
  templateUrl: './professores-cadastro.component.html',
  styleUrls: ['./professores-cadastro.component.css'],
})
export class ProfessoresCadastroComponent implements OnInit {
  expectedRoutes: any;
  goToAlunos: boolean = true;
  novoProfessor: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private professoresService: ProfessoresService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.novoProfessor = this.formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      dataNascimento: ['', Validators.required],
    });

    
  }
  ngOnInit(): void {
    this.verifyAuthentication();
  }

  // Recebe os dados do componente filho
  salvar(professor: IProfessorSaveDto) {
    this.professoresService.salvarProfessor(professor).subscribe({
      next: (res) => {
        if (res.message === 'Professor salvo com sucesso!') {
          alert('Professor salvo com sucesso!');
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
