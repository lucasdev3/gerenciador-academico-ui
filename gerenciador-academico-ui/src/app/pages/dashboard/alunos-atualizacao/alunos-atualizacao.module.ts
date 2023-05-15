import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunosAtualizacaoComponent } from './alunos-atualizacao.component';

import { FormsAlunosModule } from 'src/app/components/forms-alunos/forms-alunos.module';
import { MenuModule } from 'src/app/components/menu/menu.module';

@NgModule({
  declarations: [AlunosAtualizacaoComponent],
  exports: [AlunosAtualizacaoComponent],
  imports: [CommonModule, FormsAlunosModule, MenuModule],
})
export class AlunosAtualizacaoModule {}
