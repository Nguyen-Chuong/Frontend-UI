import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  baseUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  //Search district by text
  searchDistrict(text: string) {
    const params = new HttpParams().append('text', text);
    return this.http.get(`${this.baseUrl}/public/search-city-district`, {
      withCredentials: false,
      params: params,
    });
  }
}
