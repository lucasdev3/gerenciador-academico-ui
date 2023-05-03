import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { TitleComponent } from 'src/app/components/title/title.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TitleComponent
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    CommonModule
  ],
})
export class DashboardModule { }
