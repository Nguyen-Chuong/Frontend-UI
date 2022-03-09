import { AdminResponse } from './../_models/admin-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  baseUrl = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient, private cryptoService: CryptoService) { }

  getFeedback(page: number, pageSize: number){
    const params = new HttpParams().append('page', page).append('pageSize', pageSize)
    return this.http.get(`${this.baseUrl}/get-all-feedback`, {params: params})
  }

  getAllFeedback(){
    return this.http.get(`${this.baseUrl}/get-all-feedback/`)
  }

  getFeedbackById(id: number){
    const params = new HttpParams().append('feedbackId', id)
    return this.http.get(`${this.baseUrl}/feedback/`, {params: params})
  }

  getFeedbackByName(username: string){
    const params = new HttpParams().append('username', username)
    return this.http.get(`${this.baseUrl}/search-feedback`, {params: params})
  }

  sendResponse(response: AdminResponse) {
    return this.http.post(`${this.baseUrl}/send-response/user`, {...response})
  }

  getResponseByFeedbackId(id: number){
    const params = new HttpParams().append('feedbackId', id)
    return this.http.get(`${this.baseUrl}/view-response/`, {params: params})
  }
}
