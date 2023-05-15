import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsProfessorComponent } from './forms-professores.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [FormsProfessorComponent],
  exports: [FormsProfessorComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class FormsProfessoresModule {}
