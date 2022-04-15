import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  baseUrl = environment.API_URL;
  datePipe = new DatePipe('en-US');

  constructor(private http: HttpClient) {
  }

  getCoupon(){
    return this.http.get(`${this.baseUrl}/get-coupon`)
  }

  setCoupon(code: string, discount: number, dateExpired: Date) {
    const expire = this.datePipe.transform(new Date(dateExpired), 'yyyy-MM-dd');
    const params = new HttpParams().append('code', code).append('discount', discount).append('dateExpired', expire)
    return this.http.post(`${this.baseUrl}/set-coupon`, undefined, {params})
  }
}
