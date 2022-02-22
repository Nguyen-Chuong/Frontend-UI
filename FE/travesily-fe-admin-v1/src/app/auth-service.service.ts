import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import * as moment from "moment";
import { Account } from './_models/account';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  baseUrl = 'http://localhost:8080'
  isLoggedIn$ = false

  constructor(private http: HttpClient) {}

  private setSession(authResult) {
    const jwtToken = JSON.parse(atob(authResult['jwttoken'].split('.')[1]))
    const expiresAt = moment().add(jwtToken.exp, 'second');
    localStorage.setItem('token', authResult['jwttoken']);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/authenticate`, data).pipe(
      tap((response: any) => {
        if (response.username === null) {
          throw new Error('Login Failed')
        }
        this.isLoggedIn$ = true
        this.setSession(response)
      })
    );
  }



  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");

  }

  public isLoggedOut() {
    return !this.isLoggedIn$
  }

  get authToken() {
    return localStorage.getItem('token')
  }

  getProfile() {
    return this.http.get<Account>(`${this.baseUrl}/profile`)
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
  }

}
