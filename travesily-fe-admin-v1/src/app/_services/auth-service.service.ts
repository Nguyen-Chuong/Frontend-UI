import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../_models/account';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  baseUrl = environment.API_URL;
  isLoggedIn$ = false;
  httpSkip: any;

  constructor(private http: HttpClient) {}

  update(account: Account) {
    return this.http.patch(`${this.baseUrl}/update-profile/user`, { ...account });
  }

  //add new manager
  addManager(account: Account) {
    return this.http.post(`${this.baseUrl}/add-manager`, { ...account });
  }

  logout() {
    localStorage.removeItem('a-token');
    localStorage.removeItem('type');
  }

  changePassword(oldPass: string, newPass: string) {
    const params = new HttpParams()
      .append('oldPass', oldPass)
      .append('newPass', newPass);
    return this.http
      .patch(`${this.baseUrl}/change-password/user`, undefined, { params: params })
      .pipe(
        first(),
        tap((rs) => {
          if (rs['status'] !== 200) {
            throw new Error(rs['error_message']);
          }
        })
      );
  }

  getToken() {
    return this.http
      .get(`${this.baseUrl}/authenticate/admin-manager/hbts102secret/jwt1key`)
      .pipe(first())
      .subscribe((token) => {
        localStorage.setItem('a-token', token['data']);
      });
  }

  get authToken() {
    return localStorage.getItem('a-token');
  }

  getProfile() {
    return this.http.get<Account>(`${this.baseUrl}/profile/user`);
  }

  //Check if username is duplicated
  checkUsernameDuplicated(username: string) {
    return this.http.get(`${this.baseUrl}/check/user/username/u-${username}`, {
      withCredentials: false,
    });
  }

  //Check if email is duplicated
  checkEmailDuplicated(email: string) {
    return this.http.get(`${this.baseUrl}/check/user/email/${email}`, {
      withCredentials: false,
    });
  }
}
