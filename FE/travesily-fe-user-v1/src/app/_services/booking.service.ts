import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {first} from "rxjs";
import {CryptoService} from "./crypto.service";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  baseUrl = 'http://localhost:8080/api/v1'

  constructor(private http: HttpClient, private cryptoService: CryptoService) {
  }

  //Get the number of completed bookings by user
  getCompletedBooking() {
    return this.http.get(`${this.baseUrl}/bookings-completed`)
  }

  //Get User bookings by status
  getBookingByStatus(status: number) {
    return this.http.get(`${this.baseUrl}/bookings-by-status/${status}`)
  }

  //Get User booking details
  getBookingDetail(bookingId: string) {
    const params = new HttpParams().append('bookingId', bookingId)
    return this.http.get(`${this.baseUrl}/booking-detail`,{params: params})
  }

  //Get Booking By id
  getBookingById(bookingId: string) {
    const params = new HttpParams().append('bookingId', bookingId)
    return this.http.get(`${this.baseUrl}/booking`, {params: params})
  }


}
