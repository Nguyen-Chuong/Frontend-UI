import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  baseUrl = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient) {}

  getAllProviderPage(page: number, pageSize: number) {
    const params = new HttpParams()
      .append('page', page)
      .append('pageSize', pageSize);
    return this.http.get(`${this.baseUrl}/get-all-provider`, {
      params: params,
    });
  }

  getAllProvider() {
    return this.http.get(`${this.baseUrl}/get-all-provider`);
  }

  deleteProvider(id: number) {
    return this.http.patch(`${this.baseUrl}/ban-provider/${id}`, '');
  }
}
