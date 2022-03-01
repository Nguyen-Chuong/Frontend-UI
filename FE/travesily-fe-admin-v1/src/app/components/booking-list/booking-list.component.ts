import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { Booking } from 'src/app/_models/booking';
import { BookingService } from 'src/app/_services/booking.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],

})
export class BookingListComponent implements OnInit{
  bookings: Booking[]
  dataSource
  page: number = 0
  pageSize: number = 5
  pages: any[]
  total: number
  maxpage: number
  constructor(private bookingService: BookingService) {
    this.bookingService.getAllBooking(this.page ,this.pageSize).pipe(first()).subscribe(
      rs => {
        this.bookings = rs['data']['items']
        this.total = rs['data']['items']['total']
      }
    )
    this.maxpage = this.total / this.pageSize
    if(this.total % this.pageSize != 0){
      this.maxpage++
    }
    this.dataSource = new MatTableDataSource<Booking>(this.bookings);

  }
  displayedColumns: string[] = ['id','username', 'hotel', 'checkIn', 'checkOut', 'status'];

  ngOnInit(): void {
    console.log(this.maxpage)
    this.pages = Array.from({ length: this.maxpage }, (_, i) => i+1)
    console.log(this.pages.length)
  }

  openBookingDetail(id) {

  }

}
