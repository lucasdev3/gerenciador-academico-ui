import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { MenuModule } from 'src/app/components/menu/menu.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  imports: [
    CommonModule,
    MenuModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RegisterModule {}
