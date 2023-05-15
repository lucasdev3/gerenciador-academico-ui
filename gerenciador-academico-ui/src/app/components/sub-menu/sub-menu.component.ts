import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],
})
export class SubMenuComponent implements OnInit {
  role: string = '';

  alunosBtn = {
    classBtn: 'btn btn-danger btn-sm mx-1 my-1',
    textBtn: 'Alunos',
    routerLink: '/dashboard/alunos',
    typeBtn: 'button',
    hiddenBtn: true,
  };

  professoresBtn = {
    classBtn: 'btn btn-danger btn-sm mx-1 my-1',
    textBtn: 'Professores',
    routerLink: '/dashboard/professores',
    typeBtn: 'button',
    hiddenBtn: true,
  };

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.verifyRole();
  }

  private verifyRole() {
    this.role = this.localStorageService.getData('role') || '';
    const listRoles: string[] = [
      'ROLE_ADMINISTRADOR',
      'ROLE_PROFESSOR',
      'ROLE_ALUNO',
    ];
    if (listRoles.includes(this.role)) {
      switch (this.role) {
        case 'ROLE_ALUNO':
          this.alunosBtn.hiddenBtn = false;
          this.professoresBtn.hiddenBtn = true;
          break;
        case 'ROLE_PROFESSOR' || 'ROLE_ADMINISTRADOR':
          this.alunosBtn.hiddenBtn = false;
          this.professoresBtn.hiddenBtn = false;
          break;
        default:
          this.alunosBtn.hiddenBtn = true;
          this.professoresBtn.hiddenBtn = true;
      }
    }
  }
}
