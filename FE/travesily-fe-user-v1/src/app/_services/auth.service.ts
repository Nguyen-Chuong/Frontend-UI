import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs";
import * as moment from "moment";
import {Account} from "../_models/account";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) {

  }

  private setSession(loginInfo) {
    const jwtToken = JSON.parse(atob(loginInfo['jwttoken'].split('.')[1]))
    const expiresAt = moment().add(jwtToken.exp, 'second');
    localStorage.setItem('id_token', jwtToken.sub);
    localStorage.setItem('avatar', loginInfo.avatar);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  get username() {
    return localStorage.getItem('id_token')
  }

  get avatar() {
    return localStorage.getItem('avatar')
  }


  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/authenticate`, {email, password})
      .pipe(tap(loginInfo => {
          if (loginInfo['username'] === null)
            throw new Error('Login Failed')
          this.setSession(loginInfo)
        }
      ))
  }

  register(account: Account) {
    return this.http.post(`${this.baseUrl}/register`, {...account})
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("avatar");
  }

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
