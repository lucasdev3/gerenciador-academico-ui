import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlunosDto } from 'src/app/models/aluno.dto';
import { AlunosService } from 'src/app/services/alunos.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit{
  @Input() formNovoAluno: boolean = false;

  @Input() novoAluno: FormGroup;

  @Input() formAtualizarAluno: boolean = false;

  @Input() atualizarAluno: FormGroup;

  @Input() title: string = '';


  matricula:string = '';

  

  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunosService,
    private router: Router,
    private activatedRouter: ActivatedRoute
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
  ngOnInit() {

    if(this.formAtualizarAluno) {
      const matricula: string = this.activatedRouter.snapshot.paramMap.get('matricula') ?? '';
      this.matricula  = matricula ;
  
      this.alunoService.getAlunoPorMatricula(matricula).subscribe({
        next: (res: IAlunosDto) => {
          this.atualizarAluno.patchValue({
            matricula: res.matricula,
            nome: res.nome,
            email: res.email,
            dataNascimento: res.dataNascimento,
          });
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
  }

  salvar() {
    const aluno: IAlunosDto = this.novoAluno.value as IAlunosDto;
    console.log(aluno)
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
        if(e.error.message) {
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

  deletar() {
    
  }

}
