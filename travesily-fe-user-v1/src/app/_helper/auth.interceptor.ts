import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";
import {StorageService} from "../_services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router, private storage: StorageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.storage.authToken

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
            // redirect user to the logout page
            this.authService.logout()
            this.router.navigateByUrl('/home')
          }
        }
        return throwError(err);
      }))
  }
}
