import { OtherBenefitRequest } from './../_models/other-benefit-request';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BenefitRequest } from '../_models/benefitRequest';

@Injectable({
  providedIn: 'root',
})
export class BenefitsService {
  baseUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  getBenefitType() {
    return this.http.get(`${this.baseUrl}/get-benefit-type`);
  }

  addListBenefit(benefitRequest: BenefitRequest) {
    return this.http.post(`${this.baseUrl}/add-list-benefit`, {
      ...benefitRequest,
    });
  }

  getBenefitByType(benefitTypeId: any) {
    const params = new HttpParams().append('benefitTypeId', benefitTypeId);
    return this.http.get(`${this.baseUrl}/list-benefit`, { params: params });
  }

  getBenefitOfRoom(roomID: any){
    const params = new HttpParams().append('roomTypeId', roomID)
    return this.http.get(`${this.baseUrl}/get-room-benefit`, {params: params})
  }

  deleteRoomBenefit(roomBenefitId: any){
    const params = new HttpParams().append('roomBenefitId', roomBenefitId)
    return this.http.delete(`${this.baseUrl}/delete-room-benefit`, {params: params})
  }

  addBenefitOtherType(otherBenefitRequest: OtherBenefitRequest) {
    return this.http.post(`${this.baseUrl}/add-other-benefit`, otherBenefitRequest);
  }
}
