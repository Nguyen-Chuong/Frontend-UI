import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  baseUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAllProviderPage(status: number, page: number, pageSize: number) {
    const params = new HttpParams()
      .append('page', page)
      .append('pageSize', pageSize);
    return this.http.get(`${this.baseUrl}/get-all-provider/${status}`, {
      params: params,
    });
  }

  getAllProvider(status: number) {
    return this.http.get(`${this.baseUrl}/get-all-provider/${status}`);
  }

  deleteProvider(id: number) {
    return this.http.patch(`${this.baseUrl}/ban-provider/${id}`, '');
  }
}
