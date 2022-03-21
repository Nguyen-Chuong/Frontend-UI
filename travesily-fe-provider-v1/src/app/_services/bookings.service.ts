import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  baseUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  getBookingOfHotel(hotelId: any, page: number, pageSize: number) {
    const params = new HttpParams()
      .append('hotelId', hotelId)
      .append('page', page)
      .append('pageSize', pageSize);
    return this.http.get(`${this.baseUrl}/bookings/hotel`, { params: params });
  }

  getAllBookingOfHotel(hotelId: any) {
    const params = new HttpParams().append('hotelId', hotelId);
    return this.http.get(`${this.baseUrl}/bookings/hotel`, { params: params });
  }
}
