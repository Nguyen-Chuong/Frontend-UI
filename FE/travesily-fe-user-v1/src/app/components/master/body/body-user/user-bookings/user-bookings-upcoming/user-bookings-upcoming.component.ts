import { Component, OnInit } from '@angular/core';
import {BookingService} from "../../../../../../_services/booking.service";
import {Account} from "../../../../../../_models/account";
import {Booking} from "../../../../../../_models/booking";
import {AuthService} from "../../../../../../_services/auth.service";
import {first} from "rxjs";

@Component({
  selector: 'app-user-bookings-upcoming',
  templateUrl: './user-bookings-upcoming.component.html',
  styleUrls: ['./user-bookings-upcoming.component.scss']
})
export class UserBookingsUpcomingComponent implements OnInit {
  account: Account
  bookings: Booking[]
  constructor(private bookingService: BookingService, private authService: AuthService) {
    authService.getProfile().pipe(first()).subscribe(account => {
      this.account = account['data']
      this.bookingService.getBookingByStatus(this.account.id, 0).pipe(first()).subscribe(
        rs => {
          this.bookings = rs['data']
        }
      )
    })

  }
  ngOnInit(): void {
  }

}
