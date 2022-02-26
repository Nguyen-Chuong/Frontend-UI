import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  baseUrl = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }

  getCompletedBooking(userId: number){
    return this.http.get(`${this.baseUrl}/bookings-completed/${userId}`)
  }
}
