import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {
  baseUrl = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }
  //Get room detail by roomTypeId
  getRoomDetailByRoomTypeId(roomTypeId: number){
    return this.http.get(`${this.baseUrl}/room-detail/${roomTypeId}`)
  }
}
