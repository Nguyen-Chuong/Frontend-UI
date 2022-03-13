import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {CryptoService} from "./crypto.service";

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {
  baseUrl = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient, private cryptoService: CryptoService) { }
  //Get room detail by roomTypeId
  getRoomDetailByRoomTypeId(roomTypeId: string){
    const params = new HttpParams().append('roomTypeId', roomTypeId)
    return this.http.get(`${this.baseUrl}/public/room-detail`,{params: params})
  }

  //Get all RoomTypes by hotel Id
  getRoomTypesByHotelId(hotelId: string){
    const params = new HttpParams().append('hotelId', hotelId)
    return this.http.get(`${this.baseUrl}/public/room-type`,{params: params})
  }
}
