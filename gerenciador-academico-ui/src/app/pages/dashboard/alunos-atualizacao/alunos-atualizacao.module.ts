import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunosAtualizacaoComponent } from './alunos-atualizacao.component';

import { FormsLocalModule } from 'src/app/components/forms/forms.module';
import { ButtonModule } from 'src/app/components/button/button.module';

@NgModule({
  declarations: [AlunosAtualizacaoComponent],
  exports: [AlunosAtualizacaoComponent],
  imports: [CommonModule, FormsLocalModule, ButtonModule],
})
export class AlunosAtualizacaoModule {}
