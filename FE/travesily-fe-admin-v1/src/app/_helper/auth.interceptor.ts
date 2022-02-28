import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

import {Router} from "@angular/router";
import { AuthServiceService } from '../auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthServiceService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.authService.getToken()
    const token = this.authService.authToken
    if (token) {
      request = request.clone({setHeaders:{
        Authorization:`Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {

        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log("can not get token")
          }
        }
        return throwError(err);
      }))
  }
}
