import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  baseUrl = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }

  getBookingByStatus(userId: number, status: number){
    return this.http.get(`${this.baseUrl}/bookings-by-status/${userId}/${status}`)
  }
}
