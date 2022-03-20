import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/_models/booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  @Input() bookings: Booking[]
  dataSource
  constructor() {
    this.dataSource = new MatTableDataSource<Booking>(this.bookings);
  }

  displayedColumns: string[] = ['id', 'bookingDate', 'checkIn', 'checkOut', 'totalPaid', 'bookedQuantity'];


}
