import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Benefit } from '../_models/benefit';

@Injectable({
  providedIn: 'root'
})
export class BenefitsService {

  baseUrl = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }

  getBenefitType(){
    return this.http.get(`${this.baseUrl}/get-benefit-type`)
  }

  getDistrictInCity(benefitTypeId: any, benefits: Benefit[]){
    const params = new HttpParams().append('benefitTypeId', benefitTypeId).append('benefitList', benefitTypeId )
    return this.http.get(`${this.baseUrl}/add-benefit`, {params: params})
  }
}
