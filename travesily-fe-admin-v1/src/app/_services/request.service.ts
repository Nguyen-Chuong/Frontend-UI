import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  baseUrl = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient) {}

  denyHotel(id) {
    const params = new HttpParams().append('requestId', id);
    return this.http.patch(`${this.baseUrl}/deny-request`, undefined, {
      params: params,
    });
  }

  acceptHotel(id: string) {
    const params = new HttpParams().append('requestId', id);
    return this.http.patch(`${this.baseUrl}/accept-request`, {
      params: params,
    });
  }

  getPageRequest(status: number, page: number, pageSize: number) {
    const params = new HttpParams()
      .append('page', page)
      .append('pageSize', pageSize)
      .append('status', status);
    return this.http.get(`${this.baseUrl}/view-request`, { params: params });
  }

  getAllRequest(status: number) {
    const params = new HttpParams().append('status', status);
    return this.http.get(`${this.baseUrl}/view-request`, { params: params });
  }
}
