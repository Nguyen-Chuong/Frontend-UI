import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {DatePipe} from '@angular/common';
import { environment } from 'src/environments/environment';
import { HotelRequest } from './../_models/hotelRequest';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  baseUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  datePipe = new DatePipe('en-US');

  getAllHotel() {
    return this.http.get(`${this.baseUrl}/list-hotel`);
  }

  newHotel(hotel: HotelRequest) {
    return this.http.post(`${this.baseUrl}/add-hotel`, { ...hotel });
  }

  getHotelById(id: any) {
    const params = new HttpParams().append('hotelId', id);
    return this.http.get(`${this.baseUrl}/public/hotel`, { params: params });
  }

  updateHotel(hotel: HotelRequest) {
    return this.http.patch(`${this.baseUrl}/update-hotel-info`, { ...hotel });
  }

  enableHotel(id: any) {
    const params = new HttpParams().append('hotelId', id);
    return this.http.patch(`${this.baseUrl}/enable-hotel`, undefined, {
      params: params,
    });
  }

  disableHotel(id: any) {
    const params = new HttpParams().append('hotelId', id);
    return this.http.patch(`${this.baseUrl}/disable-hotel`, undefined, {
      params: params,
    });
  }

  getChartData(from: Date, to: Date){
    const fromDate = this.datePipe.transform(new Date(from), 'yyyy-MM-dd');
    const toDate = this.datePipe.transform(new Date(to), 'yyyy-MM-dd');
    const params = new HttpParams().append('fromDate', fromDate).append('toDate', toDate)
    return this.http.get(`${this.baseUrl}/chart-data`, {params: params});
  }
}
