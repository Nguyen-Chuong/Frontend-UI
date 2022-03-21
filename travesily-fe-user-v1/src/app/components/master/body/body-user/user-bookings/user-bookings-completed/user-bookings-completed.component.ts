import {Component, OnInit} from '@angular/core';
import {BookingService} from "../../../../../../_services/booking.service";
import {Hotel} from "../../../../../../_models/hotel";
import {Account} from "../../../../../../_models/account";
import {AuthService} from "../../../../../../_services/auth.service";
import {first} from "rxjs";
import {Booking} from "../../../../../../_models/booking";

@Component({
  selector: 'app-user-bookings-completed',
  templateUrl: './user-bookings-completed.component.html',
  styleUrls: ['./user-bookings-completed.component.scss']
})
export class UserBookingsCompletedComponent implements OnInit {
  account: Account
  bookings: Booking[]

  constructor(private bookingService: BookingService) {

    this.bookingService.getBookingByStatus(2).pipe(first()).subscribe(
      rs => {
        this.bookings = rs['data']
      }
    )

  }

  ngOnInit(): void {
  }

}
