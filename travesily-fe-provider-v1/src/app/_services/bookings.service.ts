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
      .append('hotelId', hotelId).append('status', 2)
      .append('page', page)
      .append('pageSize', pageSize);
    return this.http.get(`${this.baseUrl}/bookings/hotel`, { params: params });
  }
  
  getBookingDetail(bookingId: string) {
    const params = new HttpParams().append('bookingId', bookingId);
    return this.http.get(`${this.baseUrl}/booking-detail`, { params: params });
  }

  getAllBookingOfHotel(hotelId: any) {
    const params = new HttpParams().append('hotelId', hotelId).append('status', 2);
    return this.http.get(`${this.baseUrl}/bookings/hotel`, { params: params });
  }

  getAllBookingUpComingOfHotel(hotelId: any) {
    const params = new HttpParams().append('hotelId', hotelId).append('status', 1);
    return this.http.get(`${this.baseUrl}/bookings/hotel`, { params: params });
  }

  getAllBookingCancelOfHotel(hotelId: any) {
    const params = new HttpParams().append('hotelId', hotelId).append('status', 3);
    return this.http.get(`${this.baseUrl}/bookings/hotel`, { params: params });
  }

  completeBooking(bookingId: string){
    const params = new HttpParams().append('bookingId', bookingId);
    return this.http.patch(`${this.baseUrl}/complete-booking`, undefined, { params: params });
  }

  sendMailResponseFeedback(email: string) {
    const params = new HttpParams().append('email', email);
    return this.http.post(`${this.baseUrl}/mail/send-response`, { params: params });
  }

  //Get Booking By id
  getBookingById(bookingId: string) {
    const params = new HttpParams().append('bookingId', bookingId);
    return this.http.get(`${this.baseUrl}/booking`, { params: params });
  }
}
