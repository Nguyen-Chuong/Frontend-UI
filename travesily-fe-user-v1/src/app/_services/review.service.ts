import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ReviewRequest} from "../_models/review-request";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseUrl = environment.API_URL;
  constructor(private http: HttpClient) { }

  addReview(reviewRequest: ReviewRequest){
    return this.http.post(`${this.baseUrl}/add-review`,{...reviewRequest})
  }
}
