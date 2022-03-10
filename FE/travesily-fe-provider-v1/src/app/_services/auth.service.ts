import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from "moment";
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:8080/api/v1'

  constructor(private http: HttpClient) {}

  //Save jwt to local storage
  private setSession(loginInfo: any) {
    const jwtToken = JSON.parse(atob(loginInfo['data'].split('.')[1]))
    const expiresAt = moment().add(jwtToken.exp, 'second')
    localStorage.setItem('token', loginInfo['data'])
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()))
  }

//Get jwt token from local storage
  get authToken() {
    return localStorage.getItem('token')
  }

//Login account
  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/authenticate/provider`, {email, password}, {withCredentials: false})
      .pipe(tap(loginInfo => {
            this.setSession(loginInfo)
        }
      ))
  }


}
