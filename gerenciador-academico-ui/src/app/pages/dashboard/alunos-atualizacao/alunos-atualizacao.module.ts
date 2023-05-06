import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunosAtualizacaoComponent } from './alunos-atualizacao.component';

import { FormsLocalModule } from 'src/app/components/forms/forms.module';

@NgModule({
  declarations: [AlunosAtualizacaoComponent],
  exports: [AlunosAtualizacaoComponent],
  imports: [CommonModule, FormsLocalModule],
})
export class AlunosAtualizacaoModule {}
