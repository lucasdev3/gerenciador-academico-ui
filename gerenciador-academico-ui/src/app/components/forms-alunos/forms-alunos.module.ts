import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsAlunoComponent } from './forms-alunos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [FormsAlunoComponent],
  exports: [FormsAlunoComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class FormsAlunosModule {}
