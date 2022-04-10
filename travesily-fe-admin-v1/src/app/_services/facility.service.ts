import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FacilityAddRequest } from '../_models/facilityAddRequest';
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

  addFacility(facilityAddRequests: FacilityAddRequest, facilityTypeId: any){
    const params = new HttpParams().append('facilityTypeId', facilityTypeId);
    return this.http.post(`${this.baseUrl}/add-facility`, facilityAddRequests ,{params: params});
  }
  getFacilityType() {
    return this.http.get(`${this.baseUrl}/get-facility-type`);
  }
}
