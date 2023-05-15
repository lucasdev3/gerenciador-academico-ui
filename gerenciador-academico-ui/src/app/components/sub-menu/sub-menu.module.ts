import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubMenuComponent } from './sub-menu.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [SubMenuComponent],
  exports: [SubMenuComponent],
  imports: [CommonModule, ButtonModule],
})
export class SubMenuModule {}
