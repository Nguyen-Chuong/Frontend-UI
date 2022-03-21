import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Benefit } from '../_models/benefit';
import { BenefitRequest } from '../_models/benefitRequest';

@Injectable({
  providedIn: 'root'
})
export class BenefitsService {

  baseUrl = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }

  getBenefitType(){
    return this.http.get(`${this.baseUrl}/get-benefit-type`)
  }

  addListBenefit(benefitRequest: BenefitRequest){
    return this.http.post(`${this.baseUrl}/add-list-benefit`, {...benefitRequest})
  }

  getBenefitByType(benefitTypeId: any){
    const params = new HttpParams().append('benefitTypeId', benefitTypeId)
    return this.http.get(`${this.baseUrl}/list-benefit`, {params: params})
  }
}
