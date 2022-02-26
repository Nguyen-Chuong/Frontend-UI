import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable, tap } from 'rxjs';
import * as moment from "moment";
import { Account } from './_models/account';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  baseUrl = 'http://localhost:8080'
  isLoggedIn$ = false

  constructor(private http: HttpClient) {}

  update(account: Account) {
    return this.http.patch(`${this.baseUrl}/update-profile`, {...account})
  }


  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");

  }

  changePassword(oldPass: string, newPass: string) {
    const params = new HttpParams().append('oldPass', oldPass).append('newPass', newPass)
    return this.http.patch(`${this.baseUrl}/change-password`, undefined, {params: params})
      .pipe(first(),
        tap(rs => {
          if(rs['status'] !== 200){
            throw new Error(rs['error_message'])
          }
        }))

  }

  public isLoggedOut() {
    return !this.isLoggedIn$
  }

  get authToken() {
    return localStorage.getItem('a-token')
  }

  getProfile() {
    return this.http.get<Account>(`${this.baseUrl}/profile/user`)
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
