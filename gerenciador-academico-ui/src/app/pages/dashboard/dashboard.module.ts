import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AlunosModule } from './alunos/alunos.module';
import { AlunosAtualizacaoModule } from './alunos-atualizacao/alunos-atualizacao.module';
import { AlunosCadastroModule } from './alunos-cadastro/alunos-cadastro.module';
import { MenuModule } from 'src/app/components/menu/menu.module';

@NgModule({
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  imports: [
    CommonModule,
    AlunosModule,
    AlunosCadastroModule,
    AlunosAtualizacaoModule,
    MenuModule,
  ],
})
export class DashboardModule {}
