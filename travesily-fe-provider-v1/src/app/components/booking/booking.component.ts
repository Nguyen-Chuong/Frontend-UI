import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { Booking } from 'src/app/_models/booking';
import { BookingsService } from 'src/app/_services/bookings.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  @Input() hotelId: number
  pageSize: number = 0
  total: number
  bookings: Booking[]
  dataSource

  constructor(private bookingsService: BookingsService) {
    this.dataSource = new MatTableDataSource<Booking>(this.bookings);
  }
  ngOnInit(): void {
    this.bookingsService.getAllBookingOfHotel(this.hotelId).pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
      }
    )
    this.bookingsService.getBookingOfHotel(this.hotelId, 0, 5).pipe(first()).subscribe(
      rs => {
        this.bookings = rs['data']['items']
        this.pageSize = rs['data']['pageSize']
      }
    )
  }

  displayedColumns: string[] = ['id', 'bookingDate', 'checkIn', 'checkOut', 'totalPaid', 'bookedQuantity'];

  getPaginatorData(event: PageEvent) {
    this.bookingsService.getBookingOfHotel(this.hotelId, event.pageIndex, event.pageSize).pipe(first()).subscribe(
      rs => {
        this.bookings = rs['data']['items']

      }
    )
  }

}
