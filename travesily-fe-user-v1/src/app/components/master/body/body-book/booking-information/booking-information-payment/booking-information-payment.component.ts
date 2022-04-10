import { Component, OnInit } from '@angular/core';
import {BookingService} from "../../../../../../_services/booking.service";

@Component({
  selector: 'app-booking-information-payment',
  templateUrl: './booking-information-payment.component.html',
  styleUrls: ['./booking-information-payment.component.scss']
})
export class BookingInformationPaymentComponent implements OnInit {
bookingCount: number = 0
  constructor(private bookingService: BookingService) {
  this.bookingService.getCompletedBooking().subscribe({
    next: value => this.bookingCount = value['data']
  })
  }

  ngOnInit(): void {
  }
}
