import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CryptoService } from './crypto.service';
import { environment } from '../../environments/environment';
import {Booking} from "../_models/booking";
import {DatePipe} from "@angular/common";
import {BookingDetail} from "../_models/booking-detail";
import {BookingRequest} from "../_models/booking-request";

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  baseUrl = environment.API_URL;
  datePipe = new DatePipe('en-US')

  constructor(private http: HttpClient, private cryptoService: CryptoService) {}

  //Add new booking
  addBooking(booking: BookingRequest){
    booking.checkIn = new Date(this.datePipe.transform(new Date(booking.checkIn), 'yyyy-MM-dd'))
    booking.checkOut = new Date(this.datePipe.transform(new Date(booking.checkOut), 'yyyy-MM-dd'))
    booking.bookingDate = new Date(this.datePipe.transform(new Date(booking.bookingDate), 'yyyy-MM-dd'))
    return this.http.post(`${this.baseUrl}/add-booking`,{...booking})
  }

  //Get the number of completed bookings by user
  getCompletedBooking() {
    return this.http.get(`${this.baseUrl}/bookings-completed`);
  }

  //Get User bookings by status
  getBookingByStatus(status: number) {
    return this.http.get(`${this.baseUrl}/bookings-by-status/${status}`);
  }

  //Get User booking details
  getBookingDetail(bookingId: string) {
    const params = new HttpParams().append('bookingId', bookingId);
    return this.http.get(`${this.baseUrl}/booking-detail`, { params: params });
  }

  //Get Booking By id
  getBookingById(bookingId: string) {
    const params = new HttpParams().append('bookingId', bookingId);
    return this.http.get(`${this.baseUrl}/booking`, { params: params });
  }

  //Complete booking
  completeBooking(bookingId: string){
    const params = new HttpParams().append('bookingId', bookingId)
    return this.http.patch(`${this.baseUrl}/complete-booking`,undefined,{params: params})
  }

  //Update booking type
  updateBookingType(bookingId: string, type: number){
    const params = new HttpParams().append('bookingId', bookingId).append('type', type)
    return this.http.patch(`${this.baseUrl}/update-booking-type`,undefined,{params: params})
  }
}
