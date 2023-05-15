import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessoresComponent } from './professores.component';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'src/app/components/menu/menu.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfessoresComponent
  ],
  exports: [ProfessoresComponent],
  imports: [
    CommonModule,
    RouterModule, 
    MenuModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class ProfessoresModule { }
