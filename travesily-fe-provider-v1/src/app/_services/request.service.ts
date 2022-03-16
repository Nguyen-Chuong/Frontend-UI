import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  baseUrl = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }

  getAllRequest(){
    return this.http.get(`${this.baseUrl}/provider/view-request`)
  }

  cancelRequest(id: any) {
    const params = new HttpParams().append('requestId', id)
    return this.http.patch(`${this.baseUrl}/provider/cancel-request`,undefined, {params: params})
  }
}
