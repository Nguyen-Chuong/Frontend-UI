import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpParams} from "@angular/common/http";
import {first, map, Observable, Subject, tap} from "rxjs";
import * as moment from "moment";
import {Account} from "../_models/account";
import {Vip} from "../_models/vip";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:8080/api/v1'
  private account = new Subject<Account>()

  constructor(private http: HttpClient) {
  }

  get accountType() {
    return +localStorage.getItem('account-type')
  }

  set accountStorage(account: Account) {
    localStorage.setItem('account', JSON.stringify(account))
  }

  get accountStorage(): Account {
    return JSON.parse(localStorage.getItem('account'))
  }

  clearAccountStorage() {
    localStorage.removeItem('account')
  }

  private setSession(loginInfo) {
    const jwtToken = JSON.parse(atob(loginInfo['data']['jwttoken'].split('.')[1]))
    const expiresAt = moment().add(jwtToken.exp, 'second')
    localStorage.setItem('token', loginInfo['data']['jwttoken'])
    localStorage.setItem('account-type', loginInfo['data']['type'].toString())
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()))
  }

  get authToken() {
    return localStorage.getItem('token')
  }

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/authenticate/user`, {email, password}, {withCredentials: false})
      .pipe(tap(loginInfo => {
          if (loginInfo['data'] === null)
            throw new Error('Login Failed')
          if (loginInfo['data']['type'] === 0)
            this.setSession(loginInfo)

        }
      ))
  }

  register(account: Account) {
    return this.http.post(`${this.baseUrl}/register/user`, {...account}, {withCredentials: false})
  }

  update(account: Account) {
    return this.http.patch(`${this.baseUrl}/update-profile`, {...account})
  }

  getProfile() {
    return this.http.get<Account>(`${this.baseUrl}/profile/user`)
  }

  changePassword(oldPass: string, newPass: string) {
    const params = new HttpParams().append('oldPass', oldPass).append('newPass', newPass)
    return this.http.patch(`${this.baseUrl}/change-password`, undefined, {params: params})
      .pipe(first(),
        tap(rs => {
          if (rs['status'] !== 200) {
            throw new Error(rs['error_message'])
          }
        }))

  }

  checkUsernameDuplicated(username: string) {
    return this.http.get(`${this.baseUrl}/check/user/username/u-${username}`, {withCredentials: false})
  }

  checkEmailDuplicated(email: string) {
    return this.http.get(`${this.baseUrl}/check/user/email/${email}`, {withCredentials: false})
  }

  getVip() {
    return this.http.get(`${this.baseUrl}/vip-info`)
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem("expires_at")
    localStorage.removeItem("account-type")
  }

  generateOtp(email: string) {
    const params = new HttpParams().append('email', email)
    return this.http.post(`${this.baseUrl}/authenticate/generateOtp`, undefined, {
      params: params,
      withCredentials: false
    })
  }

  verifyOtp(email: string, otp: string) {
    const params = new HttpParams().append('email', email).append('otp', otp)
    return this.http.post(`${this.baseUrl}/authenticate/verifyOtp`, undefined, {
      params: params,
      withCredentials: false
    }).pipe(tap(
      (rs => {
        if (rs['status'] === 400) {
          throw new Error(rs['error_message'])
        }
      })))
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration())
  }

  isLoggedOut() {
    return !this.isLoggedIn()
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt)
  }
}
