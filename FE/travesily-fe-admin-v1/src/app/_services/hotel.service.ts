import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  baseUrl = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }

  getAllHotel(page: number, pageSize: number){
    const params = new HttpParams().append('page', page).append('pageSize', pageSize)
    return this.http.get(`${this.baseUrl}/get-all-hotel`, {params: params})
  }

  getHotelByStatus(status: number,page: number, pageSize: number){
    const params = new HttpParams().append('page', page).append('pageSize', pageSize)
    return this.http.get(`${this.baseUrl}/get-hotel/${status}`, {params: params})
  }

  getAllHotelByStatus(status: number){
    return this.http.get(`${this.baseUrl}/get-hotel/${status}`)
  }

  getHotelById(id: number){
    return this.http.get(`${this.baseUrl}/hotel-detail/${id}`)
  }

  getRoomByHotelId(id: number){
    return this.http.get(`${this.baseUrl}/public/room-type/${id}`)
  }

  getRoomDetailById(id: number){
    return this.http.get(`${this.baseUrl}/room-detail/${id}`)
  }

  deleteHotel(id: number){
    return this.http.patch(`${this.baseUrl}/ban-hotel/${id}`, '')
  }
}
