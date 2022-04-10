import {Component, OnInit} from '@angular/core';
import {BookingService} from "../../../../_services/booking.service";
import {ActivatedRoute} from "@angular/router";
import {Booking} from "../../../../_models/booking";

@Component({
  selector: 'app-user-add-review',
  templateUrl: './user-add-review.component.html',
  styleUrls: ['./user-add-review.component.scss']
})
export class UserAddReviewComponent implements OnInit {
  booking: Booking = new Booking()

  constructor(private bookingService: BookingService,
    private activatedRoute: ActivatedRoute,) {
    this.activatedRoute.queryParams.subscribe({
      next: params => {
        const bookingId = params['bookingId']
        this.bookingService.getBookingById(bookingId).subscribe({
          next: booking => {
            this.booking = booking['data']
          }
        })
      }
    })
  }

  ngOnInit(): void {
  }
}
