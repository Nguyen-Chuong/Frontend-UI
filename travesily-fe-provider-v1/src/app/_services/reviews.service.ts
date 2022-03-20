import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  baseUrl = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }

  getReviewOfHotel(hotelId: any, page: number, pageSize: number){
    const params = new HttpParams().append('hotelId', hotelId).append('page', page).append('pageSize', pageSize)
    return this.http.get(`${this.baseUrl}/reviews`, {params: params})
  }
}
