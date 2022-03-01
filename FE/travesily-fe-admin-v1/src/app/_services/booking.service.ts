import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  baseUrl = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }

  getUserBooking(userId: number){
    return this.http.get(`${this.baseUrl}/user-bookings/${userId}`)
  }

  getAllBooking(page: number, pageSize: number){
    const params = new HttpParams().append('page', page).append('pageSize', pageSize)
    return this.http.get(`${this.baseUrl}/get-all-booking`, {params: params})
  }
}
