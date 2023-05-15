import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ProfessoresCadastroComponent } from './professores-cadastro.component';
import { MenuModule } from 'src/app/components/menu/menu.module';
import { FormsProfessoresModule } from 'src/app/components/forms-professores/forms-professores.module';

@NgModule({
  declarations: [ProfessoresCadastroComponent],
  exports: [ProfessoresCadastroComponent],
  imports: [CommonModule, FormsProfessoresModule, MenuModule],
})
export class ProfessoresCadastroModule {}
