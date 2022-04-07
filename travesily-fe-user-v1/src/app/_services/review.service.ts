import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ReviewRequest} from "../_models/review-request";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseUrl = environment.API_URL;
  constructor(private http: HttpClient) { }

  //Add new review
  addReview(reviewRequest: ReviewRequest){
    return this.http.post(`${this.baseUrl}/add-review`,{...reviewRequest})
  }

  //Get hotel reviews
  getReviews(hotelId: string, page: number, pageSize: number, criteria: number){
    const params = new HttpParams().append('hotelId',hotelId).append('page',page).append('pageSize', pageSize)
      .append('criteria', criteria)
    return this.http.get(`${this.baseUrl}/public/reviews`,{params: params,withCredentials: false})
  }
}
