import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { Booking } from 'src/app/_models/booking';
import { BookingsService } from 'src/app/_services/bookings.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit{
  @Input() hotelId: number
  currentPage: number
  pageSize: number
  pages: any[]
  total: number
  maxPage: number
  bookings: Booking[]
  dataSource

  constructor(private bookingsService: BookingsService) {
    this.currentPage = 0
    this.pageSize = 5

    this.dataSource = new MatTableDataSource<Booking>(this.bookings);
  }
  ngOnInit(): void {
    this.bookingsService.getAllBookingOfHotel(this.hotelId).pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
        this.maxPage = this.total / this.pageSize
        if (this.total % this.pageSize != 0) {
          this.maxPage++
        }
        this.pages = Array.from({ length: this.maxPage }, (_, i) => i + 1)
      }
    )
    this.bookingsService.getBookingOfHotel(this.hotelId, this.currentPage, this.pageSize).pipe(first()).subscribe(
      rs => {
        this.bookings = rs['data']['items']

      }
    )
  }

  displayedColumns: string[] = ['id', 'bookingDate', 'checkIn', 'checkOut', 'totalPaid', 'bookedQuantity'];

  changePage(page: number){
    this.currentPage = page - 1
    this.bookingsService.getBookingOfHotel(this.hotelId, this.currentPage, this.pageSize).pipe(first()).subscribe(
      rs => {
        this.bookings = rs['data']['items']

      }
    )
  }

  previousPage(){
    this.currentPage = this.currentPage - 1
    this.bookingsService.getBookingOfHotel(this.hotelId, this.currentPage, this.pageSize).pipe(first()).subscribe(
      rs => {
        this.bookings = rs['data']['items']

      }
    )
  }

  nextPage(){
    this.currentPage = this.currentPage + 1
    this.bookingsService.getBookingOfHotel(this.hotelId, this.currentPage, this.pageSize).pipe(first()).subscribe(
      rs => {
        this.bookings = rs['data']['items']

      }
    )
  }
}
