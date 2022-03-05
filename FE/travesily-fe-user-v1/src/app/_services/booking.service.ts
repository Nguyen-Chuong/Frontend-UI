import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  baseUrl = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }
  //Get the number of completed bookings by user
  getCompletedBooking(userId: number){
    return this.http.get(`${this.baseUrl}/bookings-completed/${userId}`)
  }
  //Get User bookings by status
  getBookingByStatus(userId: number, status: number){
    return this.http.get(`${this.baseUrl}/bookings-by-status/${userId}/${status}`)
  }
  //Get User booking details
  getBookingDetail(bookingId: number){
    return this.http.get(`${this.baseUrl}/booking-detail/${bookingId}`)
  }
  //Get Booking By id
  getBookingById(bookingId: number){
    return this.http.get(`${this.baseUrl}/booking/${bookingId}`)
  }


}
