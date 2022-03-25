import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BenefitAddRequest } from '../_models/benefitAddRequest';
import { BenefitRequest } from '../_models/benefitRequest';
import { BenefitTypeRequest } from '../_models/benefitTypeRequest';

@Injectable({
  providedIn: 'root'
})
export class BenefitService {

  baseUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  addBenefitType(benefitTypeRequest: BenefitTypeRequest){
    return this.http.post(`${this.baseUrl}/add-benefit-type`, { ...benefitTypeRequest });
  }

  addBenefit(benefitAddRequests: BenefitAddRequest, benefitTypeId: any){
    const params = new HttpParams().append('benefitTypeId', benefitTypeId);
    return this.http.post(`${this.baseUrl}/add-benefit`, benefitAddRequests ,{params: params});
  }

  getBenefitType(){
    return this.http.get(`${this.baseUrl}/get-benefit-type`);
  }
}
