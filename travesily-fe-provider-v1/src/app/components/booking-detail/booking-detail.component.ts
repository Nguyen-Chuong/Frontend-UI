import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/_models/booking';
import { BookingDetail } from 'src/app/_models/booking-detail';
import { BookingsService } from 'src/app/_services/bookings.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {

  booking: Booking = new Booking()
  bookingDetails: BookingDetail[]
  constructor(private bookingService: BookingsService,
    private activatedRoute: ActivatedRoute  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const encryptedId = params['bookingId']
      this.bookingService.getBookingDetail(encryptedId).subscribe(
        rs => {
          this.bookingDetails = rs['data']
        }
      )
      this.bookingService.getBookingById(encryptedId).subscribe(
        rs => {
          this.booking = rs['data']
          this.booking.checkIn = new Date(this.booking.checkIn)
          this.booking.checkOut = new Date(this.booking.checkOut)
          this.booking.totalDays = new Date(this.booking.checkOut).getTime() / (1000 * 3600 * 24) - new Date(this.booking.checkIn).getTime() / (1000 * 3600 * 24)
        }
      )
    })
  }

}
