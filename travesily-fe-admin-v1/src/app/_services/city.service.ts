import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  baseUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAllCities() {
    return this.http.get(`${this.baseUrl}/get-city`);
  }
}
