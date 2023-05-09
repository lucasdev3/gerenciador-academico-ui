import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from '../localstorage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getData('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'json',
        
      });
    }

     const insecureRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      }
    });

    return next.handle(insecureRequest).pipe(
      catchError((error) => {
        if (error.status === 401 || error.status === 403) {
          this.localStorageService.clearData();
          this.router.navigate(['/auth/login']);
          alert(
            'Acesso negado. Você não tem permissão para acessar este diretorio, contate o administrador.'
          );
          return throwError(() => error);
        }
        return throwError(() => error);
      })
    );
  }
}
