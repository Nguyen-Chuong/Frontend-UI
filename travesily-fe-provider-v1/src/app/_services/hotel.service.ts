import { HotelRequest } from './../_models/hotelRequest';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../_models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  baseUrl = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }

  getAllHotel(){
    return this.http.get(`${this.baseUrl}/list-hotel`)
  }

  newHotel(hotel: HotelRequest) {
    return this.http.post(`${this.baseUrl}/add-hotel`, {...hotel})
  }

  getHotelById(id: any){
    const params = new HttpParams().append('hotelId', id)
    return this.http.get(`${this.baseUrl}/public/hotel`, {params: params})
  }

  updateHotel(hotel: HotelRequest) {
    return this.http.patch(`${this.baseUrl}/update-hotel-info`, { ...hotel })
  }

  enableHotel(id: any) {
    const params = new HttpParams().append('hotelId', id)
    return this.http.patch(`${this.baseUrl}/enable-hotel`,undefined, {params: params})
  }

  disableHotel(id: any) {
    const params = new HttpParams().append('hotelId', id)
    return this.http.patch(`${this.baseUrl}/disable-hotel`,undefined, {params: params})
  }
}
