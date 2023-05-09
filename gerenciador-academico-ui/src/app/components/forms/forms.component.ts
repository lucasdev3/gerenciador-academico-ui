import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlunosDto } from 'src/app/models/aluno.dto';
import { AlunosService } from 'src/app/services/alunos.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  @Input() formNovoAluno: boolean = false;

  @Input() novoAluno: FormGroup;

  @Input() formAtualizarAluno: boolean = false;

  @Input() atualizarAluno: FormGroup;

  @Input() title: string = '';

  @Output() formSubmitNovoAluno: EventEmitter<IAlunosDto> =
    new EventEmitter<IAlunosDto>();

  matricula: string = '';

  aluno: IAlunosDto | undefined;

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
    if (this.formAtualizarAluno) {
      const matricula: string =
        this.activatedRouter.snapshot.paramMap.get('matricula') ?? '';
      this.matricula = matricula;

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
    this.aluno = this.novoAluno.value;
    this.formSubmitNovoAluno.emit(this.aluno);
  }

  atualizar() {
    this.aluno = this.atualizarAluno.value;
    this.formSubmitNovoAluno.emit(this.aluno);
  }
}
