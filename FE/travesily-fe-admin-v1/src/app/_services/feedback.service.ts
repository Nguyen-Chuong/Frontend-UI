import { AdminResponse } from './../_models/admin-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  baseUrl = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }

  getFeedback(page: number, pageSize: number){
    const params = new HttpParams().append('page', page).append('pageSize', pageSize)
    return this.http.get(`${this.baseUrl}/get-all-feedback`, {params: params})
  }

  getAllFeedback(){
    return this.http.get(`${this.baseUrl}/get-all-feedback/${status}`)
  }

  getFeedbackById(id: number){
    return this.http.get(`${this.baseUrl}/feedback/${id}`)
  }

  sendResponse(response: AdminResponse) {
    return this.http.post(`${this.baseUrl}/send-response`, {...response})
  }
}
