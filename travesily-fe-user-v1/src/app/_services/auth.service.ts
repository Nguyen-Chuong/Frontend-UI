import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {first, Subject, tap} from 'rxjs';
import {Account} from '../_models/account';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.API_URL;
  private account = new Subject<Account>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService
  ) {
  }

  //Login account
  login(email: string, password: string) {
    return this.http
      .post(`${this.baseUrl}/authenticate/user`, {email, password}, {withCredentials: false})
      .pipe(tap((loginInfo) => {
        if (loginInfo['data'] === null) throw new Error('Login Failed');
        if (loginInfo['data']['type'] === 0)
          this.storage.setSession(loginInfo);
        else this.storage.accountType = loginInfo['data']['type'];
      }));
  }

  //Register new account
  register(account: Account) {
    return this.http.post(`${this.baseUrl}/register/user`, {...account}, {withCredentials: false});
  }

  //Update user's info
  update(account: Account) {
    return this.http.patch(`${this.baseUrl}/update-profile/user`, {...account});
  }

  //Get user profile detail
  getProfile() {
    return this.http.get<Account>(`${this.baseUrl}/profile/user`);
  }

  //Change user password
  changePassword(oldPass: string, newPass: string) {
    const params = new HttpParams().append('oldPass', oldPass).append('newPass', newPass);
    return this.http.patch(`${this.baseUrl}/change-password/user`, undefined, {params: params}).pipe(
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
    const params = new HttpParams().append('email', email).append('newPass', newPass);
    return this.http.patch(`${this.baseUrl}/authenticate/forgot-password`, undefined, {
      params: params,
      withCredentials: false,
    });
  }

  //Check if username is duplicated
  checkUsernameDuplicated(username: string) {
    return this.http.get(`${this.baseUrl}/check/user/username/u-${username}`, {withCredentials: false});
  }

  //Check if email is duplicated
  checkEmailDuplicated(email: string) {
    return this.http.get(`${this.baseUrl}/check/user/email/${email}`, {withCredentials: false});
  }

  //Get VIP info
  getVip() {
    return this.http.get(`${this.baseUrl}/vip-info`);
  }

  //Logout remove account info from local storage
  logout() {
    this.storage.removeSession();
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }

  //Generate random OTP send to an email
  generateOtp(email: string) {
    const params = new HttpParams().append('email', email);
    return this.http.post(`${this.baseUrl}/authenticate/generateOtp`, undefined, {
      params: params,
      withCredentials: false,
    });
  }

  //Verify if OTP is correct
  verifyOtp(email: string, otp: string) {
    const params = new HttpParams().append('email', email).append('otpEncrypted', otp);
    return this.http.post(`${this.baseUrl}/authenticate/verifyOtp`, undefined, {
      params: params,
      withCredentials: false,
    })
      .pipe(tap((rs) => {
          if (rs['status'] === 400) {
            throw new Error(rs['error_message']);
          }
        })
      );
  }

  // public isLoggedIn() {
  //   return moment().isBefore(this.getExpiration())
  // }
  //
  // isLoggedOut() {
  //   return !this.isLoggedIn()
  // }
  //
  // getExpiration() {
  //   const expiration = localStorage.getItem("expires_at");
  //   const expiresAt = JSON.parse(expiration);
  //   return moment(expiresAt)
  // }
}
