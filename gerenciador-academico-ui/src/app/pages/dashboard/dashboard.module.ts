import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AlunosModule } from './alunos/alunos.module';
import { AlunosAtualizacaoModule } from './alunos-atualizacao/alunos-atualizacao.module';
import { AlunosCadastroModule } from './alunos-cadastro/alunos-cadastro.module';
import { MenuModule } from 'src/app/components/menu/menu.module';
import { ProfessoresModule } from './professores/professores.module';
import { ProfessoresCadastroModule } from './professores-cadastro/professores-cadastro.module';

@NgModule({
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  imports: [
    CommonModule,
    MenuModule,
    AlunosModule,
    AlunosCadastroModule,
    AlunosAtualizacaoModule,
    ProfessoresModule,
    ProfessoresCadastroModule,
  ],
})
export class DashboardModule {}
