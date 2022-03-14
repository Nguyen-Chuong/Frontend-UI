import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {H} from "@angular/cdk/keycodes";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  baseUrl = environment.API_URL

  constructor(private http: HttpClient, @Inject(LOCALE_ID) private _locale: string) {
  }

  datePipe = new DatePipe('en-US')

  //Search hotel by filter
  searchHotel(destination: number, start: Date, end: Date, adultNumber: number, roomNumber: number, page: number, pageSize: number) {
    const dateIn = this.datePipe.transform(new Date(start), 'yyyy-MM-dd')
    const dateOut = this.datePipe.transform(new Date(end), 'yyyy-MM-dd')
    const params = new HttpParams()
      .append('districtId', destination)
      .append('dateIn', dateIn)
      .append('dateOut', dateOut)
      .append('numberOfPeople', adultNumber)
      .append('numberOfRoom', roomNumber)
      .append('page', page)
      .append('pageSize', pageSize)
    return this.http.get(`${this.baseUrl}/public/search-hotel`, {withCredentials: false, params: params})
  }

  //List hotel benefits
  listBenefitsByHotelId(hotelId: string) {
    const params = new HttpParams().append('hotelId', hotelId)

    return this.http.get(`${this.baseUrl}/public/list-hotel-benefit`, {withCredentials: false, params: params})
  }

  //Get hotel by id
  getHotelById(hotelId: string){
    const params = new HttpParams().append('hotelId', hotelId)
    return this.http.get(`${this.baseUrl}/public/hotel`,{withCredentials: false,params: params})
  }
}
