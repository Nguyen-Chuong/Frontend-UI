import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FacilityRequest } from '../_models/facilityRequest';
import { FacilityTypeRequest } from '../_models/facilityTypeRequest';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  baseUrl = environment.API_URL;
  constructor(private http: HttpClient) { }

  addFacilityType(facilityTypeRequest: FacilityTypeRequest) {
    return this.http.post(`${this.baseUrl}/add-benefit-type`, { ...facilityTypeRequest });
  }

  addFacility(facilityRequest: FacilityRequest[], facilityTypeId: number) {
    const params = new HttpParams().append('benefitTypeId', facilityTypeId);
    return this.http.post(`${this.baseUrl}/add-benefit-type`, { ...facilityRequest }, { params: params });
  }

  getFacilityType() {
    return this.http.get(`${this.baseUrl}/get-benefit-type`);
  }
}
