import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  login(token: string, role: string) {
    this.localStorageService.saveData('token', token);
    this.localStorageService.saveData('role', role);
    localStorage.setItem('isAuthenticated', 'true');
  }

  logout() {
    this.localStorageService.clearData();
    this.router.navigate(['/']);
  }

  get isAuthenticated(): boolean {
    return Boolean(this.localStorageService.getData('isAuthenticated'));
  }

  // se o usuário não tem a role necessária, redirecionamos para uma página de acesso negado
  hasRequiredRoles(expectedRoles: string, userRoles: string): boolean {
    if (expectedRoles === userRoles) {
      return true;
    }
    return false;
  }
}
