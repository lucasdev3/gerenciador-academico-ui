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
  ) {
    const token = this.localStorageService.getData('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'json',
        withCredentials: true
      });
    }

    return next.handle(request);

  }
}
