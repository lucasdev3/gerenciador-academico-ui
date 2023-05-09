import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LocalStorageService } from '../localstorage.service';
import { Observable } from 'rxjs';
import { openRoutes } from 'src/app/enviroments/global-variables';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  dadosDaRotaAtual$: Observable<any>;
  allowedRoutes = openRoutes;
  currentPath: any;

  constructor(
    @Inject(LocalStorageService)
    private localStorageService: LocalStorageService,
    @Inject(AuthService) private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.dadosDaRotaAtual$ = this.activatedRoute.data;
  }

  canActivate(): boolean {
    if (this.authService.isAuthenticated) {
      return true;
    } else if (this.allowedRoutes.includes(this.router.url)) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
