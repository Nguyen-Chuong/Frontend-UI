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

  newHotel(hotel: Hotel) {
    return this.http.post(`${this.baseUrl}/add-hotel`, {...hotel})
  }
}
