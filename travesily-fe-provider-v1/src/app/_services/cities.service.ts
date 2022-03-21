import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  baseUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAllCities() {
    return this.http.get(`${this.baseUrl}/get-city`);
  }

  getDistrictInCity(id: any) {
    const params = new HttpParams().append('cityId', id);
    return this.http.get(`${this.baseUrl}/get-district`, { params: params });
  }
}
