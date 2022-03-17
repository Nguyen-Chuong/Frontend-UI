import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  baseUrl = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient, private cryptoService: CryptoService) {}

  getUserBooking(username: string) {
    const params = new HttpParams().append('username', username);
    return this.http.get(`${this.baseUrl}/user-bookings`, { params: params });
  }

  getAllBookingPage(page: number, pageSize: number) {
    const params = new HttpParams()
      .append('page', page)
      .append('pageSize', pageSize);
    return this.http.get(`${this.baseUrl}/get-all-booking`, { params: params });
  }

  getAllBooking() {
    return this.http.get(`${this.baseUrl}/get-all-booking`);
  }
}
