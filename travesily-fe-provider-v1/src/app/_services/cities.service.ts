import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  baseUrl = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }

  getAllCities(){
    return this.http.get(`${this.baseUrl}/get-city`)
  }

  getDistrictInCity(id: any){
    const params = new HttpParams().append('cityId', id)
    return this.http.get(`${this.baseUrl}/get-district`, {params: params})
  }
}
