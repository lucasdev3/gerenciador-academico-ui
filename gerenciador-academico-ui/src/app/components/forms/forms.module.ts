import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [FormsComponent],
  exports: [FormsComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class FormsLocalModule {}
