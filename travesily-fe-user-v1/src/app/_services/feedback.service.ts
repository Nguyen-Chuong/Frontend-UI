import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {FeedbackRequest} from "../_models/feedback-request";
import {ResponseRequest} from "../_models/response-request";

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

  //List user's feedback
  listFeedback() {
    return this.http.get(`${this.baseUrl}/list-feedback`)
  }

  //Get feedback by id
  getFeedbackById(feedbackId: string) {
    const params = new HttpParams().append('feedbackId', feedbackId)
    return this.http.get(`${this.baseUrl}/feedback`, {params: params})
  }

  //Get feedback responses
  getFeedbackResponses(feedbackId: string){
    const params = new HttpParams().append('feedbackId',feedbackId)
    return this.http.get(`${this.baseUrl}/view-response`,{params: params})
  }

  //Send response
  sendResponse(responseRequest: ResponseRequest){
    return this.http.post(`${this.baseUrl}/send-response/admin`,{...responseRequest})
  }
}
