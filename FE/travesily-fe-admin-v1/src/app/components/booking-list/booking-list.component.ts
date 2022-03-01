import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { Booking } from 'src/app/_models/booking';
import { BookingService } from 'src/app/_services/booking.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],

})
export class BookingListComponent {
  bookings: Booking[]
  dataSource
  page: number = 0
  pageSize: number = 5
  pages: number[]
  constructor(private bookingService: BookingService) {
    this.bookingService.getAllBooking(this.page ,this.pageSize).pipe(first()).subscribe(
      rs => {
        this.bookings = rs['data']['items']
        console.log(this.bookings.length)
      }
    )
    this.dataSource = new MatTableDataSource<Booking>(this.bookings);

  }
  displayedColumns: string[] = ['id','username', 'hotel', 'checkIn', 'checkOut', 'status'];

  openBookingDetail(id) {

  }

}
