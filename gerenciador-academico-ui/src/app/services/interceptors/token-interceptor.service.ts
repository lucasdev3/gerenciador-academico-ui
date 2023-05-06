import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { TokenService } from '../token.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.getData('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'json',
      });
    }

    return (
      next
        .handle(request)
        .pipe(
          catchError((error) => {
            if (error.status === 401 || error.status === 403) {
              this.router.navigate(['/auth/login']);
              alert(
                'Acesso negado. Você não tem permissão para acessar este diretorio, contate o administrador.'
              );
              return throwError(error);
            }
            return throwError(error);
          })
        )
    );
  }
}
