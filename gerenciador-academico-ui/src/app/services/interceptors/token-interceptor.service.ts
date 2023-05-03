import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../token.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): any {

    const token = this.tokenService.getData('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'json',
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse): any => {
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['/auth/login']);
          alert('Acesso negado. Você não tem permissão para acessar este diretorio, contate o administrador.');
          return throwError(error);
        }
      })
    );
  }

}
  