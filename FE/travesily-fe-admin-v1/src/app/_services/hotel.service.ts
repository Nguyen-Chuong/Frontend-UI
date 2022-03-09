import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  baseUrl = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient, private cryptoService: CryptoService) { }

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

  getPageHotelByStatus(status: number, page: number, pageSize: number){
    const params = new HttpParams().append('page', page).append('pageSize', pageSize)
    return this.http.get(`${this.baseUrl}/get-hotel/${status}`, {params: params})
  }

  getHotelById(id: string){
    const params = new HttpParams().append('hotelId', id)
    return this.http.get(`${this.baseUrl}/hotel-detail`, {params: params})
  }

  getRoomByHotelId(id: string){
    const params = new HttpParams().append('hotelId', id)
    return this.http.get(`${this.baseUrl}/public/room-type/`, {params : params})
  }

  getRoomDetailById(id: number){
    return this.http.get(`${this.baseUrl}/room-detail/${id}`)
  }

  deleteHotel(id: number){
    return this.http.patch(`${this.baseUrl}/ban-hotel/${id}`, '')
  }
}
