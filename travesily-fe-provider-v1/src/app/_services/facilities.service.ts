import { OtherFacilityRequest } from './../_models/other-facility-request';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FacilityRequest } from '../_models/facilityRequest';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {

  baseUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  getFacilitiesType() {
    return this.http.get(`${this.baseUrl}/get-facility-type`);
  }

  addListFacilities(facilityRequest: FacilityRequest) {
    return this.http.post(`${this.baseUrl}/add-list-facility`, {
      ...facilityRequest,
    });
  }

  getFacilitiesByType(facilityTypeId: any) {
    const params = new HttpParams().append('facilityTypeId', facilityTypeId);
    return this.http.get(`${this.baseUrl}/list-facility`, { params: params });
  }

  getFacilitiesOfRoom(roomID: any){
    const params = new HttpParams().append('roomTypeId', roomID)
    return this.http.get(`${this.baseUrl}/get-room-facility`, {params: params})
  }

  deleteRoomFacilities(roomFacilityId: any){
    const params = new HttpParams().append('roomFacilityId', roomFacilityId)
    return this.http.delete(`${this.baseUrl}/delete-room-facility`, {params: params})
  }

  addFacilityOtherType(otherFacilityRequest: OtherFacilityRequest) {
    return this.http.post(`${this.baseUrl}/add-other-facility`, otherFacilityRequest);
  }
}
