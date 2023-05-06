import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AlunosModule } from './alunos/alunos.module';
import { AlunosAtualizacaoModule } from './alunos-atualizacao/alunos-atualizacao.module';

@NgModule({
  declarations: [DashboardComponent],
  exports: [DashboardComponent, ],
  imports: [
    CommonModule,
    AlunosModule,
    AlunosAtualizacaoModule,
  ],
})
export class DashboardModule {}
