import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunosCadastroComponent } from './alunos-cadastro.component';
import { FormsLocalModule } from 'src/app/components/forms/forms.module';
 

@NgModule({
  declarations: [AlunosCadastroComponent],
  exports: [AlunosCadastroComponent],
  imports: [CommonModule, FormsLocalModule],
})
export class AlunosCadastroModule {}
