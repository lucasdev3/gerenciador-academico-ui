import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuModule } from 'src/app/components/menu/menu.module';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, MenuModule],
})
export class LoginModule {}
