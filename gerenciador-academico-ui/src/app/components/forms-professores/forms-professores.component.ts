import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProfessorDto, IProfessorSaveDto } from 'src/app/models/professor.dto';
import { ProfessoresService } from 'src/app/services/professores.service';

@Component({
  selector: 'app-professores-forms',
  templateUrl: './forms-professores.component.html',
  styleUrls: ['./forms-professores.component.css'],
})
export class FormsProfessorComponent implements OnInit {
  @Input() formNovoProfessor: boolean = false;

  @Input() novoProfessor: FormGroup;

  @Input() formAtualizarProfessor: boolean = false;

  @Input() atualizarProfessor: FormGroup;

  @Input() title: string = '';

  @Output() formSubmitNovoProfessor: EventEmitter<IProfessorSaveDto> =
    new EventEmitter<IProfessorSaveDto>();


  constructor(
    private formBuilder: FormBuilder,
    private professoresService: ProfessoresService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.novoProfessor = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      dataNascimento: ['', Validators.required],
    });

    this.atualizarProfessor = this.formBuilder.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
    });
  }
  ngOnInit() {
    if (this.formAtualizarProfessor) {
      const id: string =
        this.activatedRouter.snapshot.paramMap.get('id') ?? '';
      
      this.professoresService.getProfessorPeloId(id).subscribe({
        next: (res: IProfessorDto) => {
          this.atualizarProfessor.patchValue({
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
    const professor: IProfessorSaveDto = this.novoProfessor.value;
    this.formSubmitNovoProfessor.emit(professor);
  }

  atualizar() {
    const professor: IProfessorSaveDto = this.atualizarProfessor.value;
    this.formSubmitNovoProfessor.emit(professor);
  }
}
