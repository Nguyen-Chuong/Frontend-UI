import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  baseUrl = environment.API_URL;
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
