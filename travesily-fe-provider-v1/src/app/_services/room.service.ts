import { HttpClient } from '@angular/common/http';
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
}
