import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlunosDto } from 'src/app/models/aluno.dto';
import { AlunosService } from 'src/app/services/alunos.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css'],
})
export class AlunosComponent implements OnInit {
  title: string = 'Alunos';
  alunos: IAlunosDto[] = [];
  routerLink: string = '';

  constructor(private alunoService: AlunosService, private router: Router, private activatedRouter: ActivatedRoute) {}

  ngOnInit(): void {
    if(this.router.url.includes('/dashboard/alunos/deletar/')) {
      this.deletar();
      return;
    }
    // carrega os dados
    this.getAlunos();
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
    const matricula: string = this.activatedRouter.snapshot.paramMap.get('matricula') ?? '';
    let btnConfirm: boolean = confirm('Deseja realmente deletar o aluno com matricula: ' + matricula);
    if(btnConfirm) {
          this.alunoService.deletarAluno(matricula).subscribe({
            next: () => {
              this.router.navigate(['/dashboard/alunos']);
            },
            error: (e) => {
              console.log(e);
            },
          });
    }else {
      this.router.navigate(['/dashboard/alunos']);
    }

  }

}
