import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunosComponent } from './alunos.component';
import { TitleComponent } from 'src/app/components/title/title.component';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'src/app/components/menu/menu.module';
import { SubMenuModule } from 'src/app/components/sub-menu/sub-menu.module';

@NgModule({
  declarations: [AlunosComponent, TitleComponent],
  exports: [AlunosComponent],
  imports: [CommonModule, RouterModule, MenuModule, SubMenuModule],
})
export class AlunosModule {}
