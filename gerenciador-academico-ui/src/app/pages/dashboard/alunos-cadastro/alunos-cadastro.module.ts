import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunosCadastroComponent } from './alunos-cadastro.component';
import { FormsLocalModule } from 'src/app/components/forms/forms.module';
import { ButtonModule } from 'src/app/components/button/button.module';

@NgModule({
  declarations: [AlunosCadastroComponent],
  exports: [AlunosCadastroComponent],
  imports: [CommonModule, FormsLocalModule, ButtonModule],
})
export class AlunosCadastroModule {}
