import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunosCadastroComponent } from './alunos-cadastro.component';
import { FormsAlunosModule } from 'src/app/components/forms-alunos/forms-alunos.module';
import { MenuModule } from 'src/app/components/menu/menu.module';

@NgModule({
  declarations: [AlunosCadastroComponent],
  exports: [AlunosCadastroComponent],
  imports: [CommonModule, FormsAlunosModule, MenuModule],
})
export class AlunosCadastroModule {}
