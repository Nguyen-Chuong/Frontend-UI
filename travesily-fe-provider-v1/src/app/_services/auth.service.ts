import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { first, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../_models/account';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  account: Account;

  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  //Save jwt to local storage
  private setSession(loginInfo: any) {
    const jwtToken = JSON.parse(atob(loginInfo['data'].split('.')[1]));
    const expiresAt = moment().add(jwtToken.exp, 'second');
    localStorage.setItem('token', loginInfo['data']);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  //Get jwt token from local storage
  get authToken() {
    return localStorage.getItem('token');
  }

  //Login account
  login(email: string, password: string) {
    return this.http
      .post(
        `${this.baseUrl}/authenticate/provider`,
        { email, password },
        { withCredentials: false }
      )
      .pipe(
        tap((loginInfo) => {
          this.setSession(loginInfo);
        })
      );
  }
  
  //Register new account
  register(account: Account) {
    return this.http.post(
      `${this.baseUrl}/register/provider`,
      { ...account },
      { withCredentials: false }
    );
  }

  //Check if username is duplicated
  checkUsernameDuplicated(username: string) {
    return this.http.get(
      `${this.baseUrl}/check/provider/username/${username}`,
      { withCredentials: false }
    );
  }

  //Check if email is duplicated
  checkEmailDuplicated(email: string) {
    return this.http.get(`${this.baseUrl}/check/provider/email/${email}`, {
      withCredentials: false,
    });
  }

  //Get user profile detail
  getProfile() {
    return this.http.get<Account>(`${this.baseUrl}/profile/provider`);
  }

  update(account: Account) {
    return this.http.patch(`${this.baseUrl}/update-profile/provider`, {
      ...account,
    });
  }

  changePassword(oldPass: string, newPass: string) {
    const params = new HttpParams()
      .append('oldPass', oldPass)
      .append('newPass', newPass);
    return this.http
      .patch(`${this.baseUrl}/change-password/provider`, undefined, {
        params: params,
      })
      .pipe(
        first(),
        tap((rs) => {
          if (rs['status'] !== 200) {
            throw new Error(rs['error_message']);
          }
        })
      );
  }

  //Reset password with given email and newPass
  resetPassword(email: string, newPass: string) {
    const params = new HttpParams()
      .append('email', email)
      .append('newPass', newPass);
    return this.http.patch(
      `${this.baseUrl}/authenticate/provider/forgot-password`,
      undefined,
      {
        params: params,
        withCredentials: false,
      }
    );
  }

  //Generate random OTP send to an email
  generateOtp(email: string) {
    const params = new HttpParams().append('email', email);
    return this.http.post(
      `${this.baseUrl}/authenticate/generateOtp`,
      undefined,
      {
        params: params,
        withCredentials: false,
      }
    );
  }

  //Verify if OTP is correct
  verifyOtp(email: string, otp: string) {
    const params = new HttpParams()
      .append('email', email)
      .append('otpEncrypted', otp);
    return this.http
      .post(`${this.baseUrl}/authenticate/verifyOtp`, undefined, {
        params: params,
        withCredentials: false,
      })
      .pipe(
        tap((rs) => {
          if (rs['status'] === 400) {
            throw new Error(rs['error_message']);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }
}
