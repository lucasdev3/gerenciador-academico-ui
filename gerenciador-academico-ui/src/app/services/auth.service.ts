import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {}

  get isAuthenticated(): boolean {
    if (
      this.localStorageService.getData('token') &&
      this.localStorageService.getData('role')
      // this.localStorageService.getData('isAuthenticated') === 'true'
    ) {
      return true;
    } else {
      return false;
    }
  }

  login(token: string, role: string) {
    this.localStorageService.saveData('token', token);
    this.localStorageService.saveData('role', role);
    this.localStorageService.saveData('isAuthenticated', 'true');
  }

  logout() {
    this.localStorageService.clearData();
    this.localStorageService.saveData('isAuthenticated', 'false');
    this.router.navigate(['/']);
  }

  // se o usuário não tem a role necessária, redirecionamos para uma página de acesso negado
  hasRequiredRoles(expectedRoles: string[]): boolean {
    const role = this.localStorageService.getData('role');
    if (expectedRoles.includes(String(role))) {
      return true;
    } else {
    }
    return false;
  }
}
