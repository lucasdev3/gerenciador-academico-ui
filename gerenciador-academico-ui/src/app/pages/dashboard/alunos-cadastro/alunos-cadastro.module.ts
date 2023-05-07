import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunosCadastroComponent } from './alunos-cadastro.component';
import { FormsLocalModule } from 'src/app/components/forms/forms.module';
import { MenuModule } from 'src/app/components/menu/menu.module';

@NgModule({
  declarations: [AlunosCadastroComponent],
  exports: [AlunosCadastroComponent],
  imports: [CommonModule, FormsLocalModule, MenuModule],
})
export class AlunosCadastroModule {}
