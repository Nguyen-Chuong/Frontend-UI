import {Injectable} from '@angular/core';
import {SearchFilter} from '../_models/search-filter';
import * as moment from 'moment';
import {BookingRequest} from "../_models/booking-request";

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {
  }

  //Save login info
  setSession(loginInfo) {
    const jwtToken = JSON.parse(atob(loginInfo['data']['jwttoken'].split('.')[1]));
    const expiresAt = moment().add(jwtToken.exp, 'second');
    localStorage.setItem('token', loginInfo['data']['jwttoken']);
    localStorage.setItem('account-type', loginInfo['data']['type']);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  //Remove login info
  removeSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('account-type');
  }

  //Get login account type
  get accountType() {
    return +localStorage.getItem('account-type');
  }

  //Set login account type
  set accountType(type: number) {
    localStorage.setItem('account-type', type.toString());
  }

  //Get jwt token
  get authToken() {
    return localStorage.getItem('token');
  }

  //Set search filter
  set searchFilter(filter: SearchFilter) {
    localStorage.setItem('destination', JSON.stringify(filter.destination));
    localStorage.setItem('from', filter.from.toDateString());
    localStorage.setItem('to', filter.to.toDateString());
    localStorage.setItem('guestNumber', filter.guestNumber.toString());
    localStorage.setItem('roomNumber', filter.roomNumber.toString());
  }

  //Get search filter
  get searchFilter() {
    const filter = new SearchFilter();
    filter.destination = JSON.parse(localStorage.getItem('destination'));
    filter.from = new Date(localStorage.getItem('from'));
    filter.to = new Date(localStorage.getItem('to'));
    filter.guestNumber = +localStorage.getItem('guestNumber');
    filter.roomNumber = +localStorage.getItem('roomNumber');
    return filter;
  }

  //Set booking request
  set bookingRequest(bookingRequest: BookingRequest) {
    localStorage.setItem('bookingRequest', JSON.stringify(bookingRequest))
  }

  get bookingRequest(): BookingRequest {
    return JSON.parse(localStorage.getItem('bookingRequest'))
  }

  clearBookingRequest() {
    localStorage.removeItem('bookingRequest')
  }
}
