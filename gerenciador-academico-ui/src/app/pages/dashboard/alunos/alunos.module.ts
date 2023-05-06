import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunosComponent } from './alunos.component';
import { TitleComponent } from 'src/app/components/title/title.component';
import { AlunosCadastroModule } from '../alunos-cadastro/alunos-cadastro.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [AlunosComponent, TitleComponent],
  exports: [AlunosComponent],
  imports: [CommonModule, RouterModule],
})
export class AlunosModule {}
