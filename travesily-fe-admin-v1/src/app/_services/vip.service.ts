import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VipService {
  baseUrl = environment.API_URL;
  constructor(private http: HttpClient) { }

  updateVip(discount: number, rangeStart: number, rangeEnd: number, id: number){
    const params = new HttpParams().append('discount', discount).append('rangeStart', rangeStart).append('rangeEnd', rangeEnd).append('id', id);
    return this.http.patch(`${this.baseUrl}/update-vip-info` , undefined, {params: params});
  }
  getVip() {
    return this.http.get(`${this.baseUrl}/vip-info`);
  }
}
