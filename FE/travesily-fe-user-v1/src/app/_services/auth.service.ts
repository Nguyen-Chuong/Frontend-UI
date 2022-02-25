import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpParams} from "@angular/common/http";
import {first, map, Observable, tap} from "rxjs";
import * as moment from "moment";
import {Account} from "../_models/account";
import {Vip} from "../_models/vip";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:8080'
  httpSkip

  constructor(private http: HttpClient, handler: HttpBackend) {
    this.httpSkip = new HttpClient(handler)
  }

  private setSession(loginInfo) {
    const jwtToken = JSON.parse(atob(loginInfo['jwttoken'].split('.')[1]))
    const expiresAt = moment().add(jwtToken.exp, 'second');
    localStorage.setItem('token', loginInfo['jwttoken'])
    // localStorage.setItem('id_token', jwtToken.sub);
    // localStorage.setItem('avatar', loginInfo.avatar);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  get authToken() {
    return localStorage.getItem('token')
  }

  login(email: string, password: string) {
    return this.httpSkip.post(`${this.baseUrl}/authenticate`, {email, password})
      .pipe(tap(loginInfo => {
          if (loginInfo['username'] === null)
            throw new Error('Login Failed')
          this.setSession(loginInfo)
        }
      ))
  }

  register(account: Account) {
    return this.httpSkip.post(`${this.baseUrl}/register`, {...account})
  }

  update(account: Account) {
    return this.http.patch(`${this.baseUrl}/update-profile`, {...account})
  }

  getProfile() {
    return this.http.get<Account>(`${this.baseUrl}/profile`)
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

  checkUsernameDuplicated(username: string){
    return this.httpSkip.get(`${this.baseUrl}/check/username/${username}`)
  }

  checkEmailDuplicated(email: string){
    return this.httpSkip.get(`${this.baseUrl}/check/email/${email}`)
  }

  getVip(){
    return this.http.get(`${this.baseUrl}/vip-info`)
  }

  logout() {
    // localStorage.removeItem("id_token");
    localStorage.removeItem('token')
    localStorage.removeItem("expires_at");
    // localStorage.removeItem("avatar");
  }

  // checkDuplicateUsername(username: string): Observable<any>{
  //   return this.http.get(`${this.baseUrl}/check-username/${username}`)
  // }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
