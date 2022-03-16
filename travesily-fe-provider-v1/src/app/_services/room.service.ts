import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../_models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  baseUrl = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }

  newRoom(room: Room) {
    return this.http.post(`${this.baseUrl}/add-room`, {...room})
  }

  getAllRoomOfHotel(hotelId: any){
    const params = new HttpParams().append('hotelId', hotelId)
    return this.http.get(`${this.baseUrl}/list-room-type`, {params: params})
  }

  getRoomDetail(roomId: any){
    const params = new HttpParams().append('roomTypeId', roomId)
    return this.http.get(`${this.baseUrl}/public/room-detail`, {params: params})
  }

  updateRoom(room: Room) {
    return this.http.patch(`${this.baseUrl}/update-room`, { ...room })
  }

  enableRoom(id: any) {
    const params = new HttpParams().append('roomTypeId', id)
    return this.http.patch(`${this.baseUrl}/enable-room`,undefined, {params: params})
  }

  disableRoom(id: any) {
    const params = new HttpParams().append('roomTypeId', id)
    return this.http.patch(`${this.baseUrl}/disable-room`,undefined, {params: params})
  }
}
