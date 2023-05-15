import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessoresAtualizacaoComponent } from './professores-atualizacao.component';
import { FormsProfessoresModule } from 'src/app/components/forms-professores/forms-professores.module';
import { MenuModule } from 'src/app/components/menu/menu.module';

@NgModule({
  declarations: [ProfessoresAtualizacaoComponent],
  exports: [ProfessoresAtualizacaoComponent],
  imports: [CommonModule, FormsProfessoresModule, MenuModule],
})
export class ProfessoresAtualizacaoModule {}
