import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CryptoService} from './crypto.service';
import {DatePipe} from '@angular/common';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomTypeService {
  baseUrl = environment.API_URL;
  datePipe = new DatePipe('en-US');

  constructor(private http: HttpClient) {
  }

  //Get room detail by roomTypeId
  getRoomDetailByRoomTypeId(roomTypeId: string) {
    const params = new HttpParams().append('roomTypeId', roomTypeId);
    return this.http.get(`${this.baseUrl}/public/room-detail`, {params: params, withCredentials: false});
  }

  //Get all RoomTypes by hotel Id
  getRoomTypesByHotelId(hotelId: string, from: Date, to: Date) {
    const dateIn = this.datePipe.transform(new Date(from), 'yyyy-MM-dd');
    const dateOut = this.datePipe.transform(new Date(to), 'yyyy-MM-dd');
    const params = new HttpParams().append('hotelId', hotelId).append('dateIn', dateIn).append('dateOut', dateOut);
    return this.http.get(`${this.baseUrl}/public/room-type`, {params: params, withCredentials: false});
  }
}
