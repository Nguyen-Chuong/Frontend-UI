import { Component, OnInit } from '@angular/core';
import {Account} from "../../../../../../_models/account";
import {Booking} from "../../../../../../_models/booking";
import {BookingService} from "../../../../../../_services/booking.service";
import {AuthService} from "../../../../../../_services/auth.service";
import {first} from "rxjs";

@Component({
  selector: 'app-user-bookings-cancelled',
  templateUrl: './user-bookings-cancelled.component.html',
  styleUrls: ['./user-bookings-cancelled.component.scss']
})
export class UserBookingsCancelledComponent implements OnInit {
  account: Account
  bookings: Booking[]
  constructor(private bookingService: BookingService, private authService: AuthService) {
    authService.getProfile().pipe(first()).subscribe(account => {
      this.account = account['data']
      this.bookingService.getBookingByStatus(this.account.id, 2).pipe(first()).subscribe(
        rs => {
          this.bookings = rs['data']
        }
      )
    })

  }
  ngOnInit(): void {
  }

}
