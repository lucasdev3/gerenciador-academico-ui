import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunosAtualizacaoComponent } from './alunos-atualizacao.component';

import { FormsLocalModule } from 'src/app/components/forms/forms.module';
import { MenuModule } from 'src/app/components/menu/menu.module';

@NgModule({
  declarations: [AlunosAtualizacaoComponent],
  exports: [AlunosAtualizacaoComponent],
  imports: [CommonModule, FormsLocalModule, MenuModule],
})
export class AlunosAtualizacaoModule {}
