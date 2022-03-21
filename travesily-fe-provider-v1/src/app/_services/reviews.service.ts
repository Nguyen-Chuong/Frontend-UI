import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  baseUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  getReviewOfHotel(hotelId: any, page: number, pageSize: number) {
    const params = new HttpParams()
      .append('hotelId', hotelId)
      .append('page', page)
      .append('pageSize', pageSize);
    return this.http.get(`${this.baseUrl}/reviews`, { params: params });
  }

  getAllReviewOfHotel(hotelId: any) {
    const params = new HttpParams().append('hotelId', hotelId);
    return this.http.get(`${this.baseUrl}/reviews`, { params: params });
  }
}
