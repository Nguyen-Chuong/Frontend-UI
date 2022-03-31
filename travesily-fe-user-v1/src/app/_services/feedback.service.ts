import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {FeedbackRequest} from "../_models/feedback-request";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  //Send feedback
  sendFeedback(feedbackRequest: FeedbackRequest) {
    return this.http.post(`${this.baseUrl}/send-feedback`, {...feedbackRequest})
  }

  //List feedback
  listFeedback() {
    return this.http.get(`${this.baseUrl}/list-feedback`)
  }

  //Get feedback by id
  getFeedbackById(feedbackId: string) {
    const params = new HttpParams().append('feedbackId', feedbackId)
    return this.http.get(`${this.baseUrl}/feedback`, {params: params})
  }
}
