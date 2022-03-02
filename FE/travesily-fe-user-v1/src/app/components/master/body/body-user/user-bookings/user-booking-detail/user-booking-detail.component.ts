import {Component, OnInit} from '@angular/core';
import {BookingService} from "../../../../../../_services/booking.service";
import {BookingDetail} from "../../../../../../_models/booking-detail";
import {first} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Booking} from "../../../../../../_models/booking";
import {Account} from "../../../../../../_models/account";
import {AuthService} from "../../../../../../_services/auth.service";

@Component({
  selector: 'app-user-booking-detail',
  templateUrl: './user-booking-detail.component.html',
  styleUrls: ['./user-booking-detail.component.scss']
})
export class UserBookingDetailComponent implements OnInit {
  account: Account = new Account()
  booking: Booking = new Booking()
  bookingDetails: BookingDetail[] = []

  constructor(authService: AuthService ,private bookingService: BookingService, private activatedRoute: ActivatedRoute) {
    authService.getProfile().pipe(first()).subscribe(rs => {
      this.account = rs['data']
    })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.bookingService.getBookingDetail(params['bookingId']).pipe(first()).subscribe(
        rs => {
          this.bookingDetails = rs['data']
        }
      )
      this.bookingService.getBookingById(params['bookingId']).pipe(first()).subscribe(
        rs => {
          this.booking = rs['data']
          this.booking.checkIn = new Date(this.booking.checkIn)
          this.booking.checkOut = new Date(this.booking.checkOut)
          this.booking.totalDays = new Date(this.booking.checkOut).getDay() - new Date(this.booking.checkIn).getDay()
        }
      )
    })
  }

}
