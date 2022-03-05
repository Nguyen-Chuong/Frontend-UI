import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  baseUrl = 'http://localhost:8080/api/v1'

  constructor(private http: HttpClient,@Inject(LOCALE_ID) private _locale: string) {
  }

  datePipe = new DatePipe('en-US')

  //Search hotel by filter
  searchHotel(destination: number, start: Date, end: Date, adultNumber: number, roomNumber: number, page: number, pageSize: number) {
    const dateIn = this.datePipe.transform(new Date(start), 'yyyy-MM-dd')
    const dateOut = this.datePipe.transform(new Date(start), 'yyyy-MM-dd')
    const params = new HttpParams()
      .append('districtId', destination)
      .append('dateIn', dateIn)
      .append('dateOut', dateOut)
      .append('numberOfPeople', adultNumber)
      .append('numberOfRoom', roomNumber)
      .append('page', page)
      .append('pageSize', pageSize)
    return this.http.get(`${this.baseUrl}/public/search-hotel`, {withCredentials: false, params: params} )
  }
}
