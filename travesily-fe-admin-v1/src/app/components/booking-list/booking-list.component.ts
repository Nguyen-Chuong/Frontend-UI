import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Booking } from 'src/app/_models/booking';
import { BookingService } from 'src/app/_services/booking.service';
import { CryptoService } from 'src/app/_services/crypto.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],

})
export class BookingListComponent implements OnInit {
  bookings: Booking[]
  dataSource
  pageSize: number = 0
  total: number
  constructor(private bookingService: BookingService,
    private router: Router,
    private cryptoService: CryptoService) {
  }
  displayedColumns: string[] = ['id', 'username', 'hotel', 'checkIn', 'checkOut', 'status'];

  ngOnInit(): void {

    this.bookingService.getAllBooking().pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
      }
    )
    this.bookingService.getAllBookingPage(0, 5).pipe(first()).subscribe(
      rs => {
        this.bookings = rs['data']['items']
        this.pageSize = rs['data']['pageSize']
      }
    )


    this.dataSource = new MatTableDataSource<Booking>(this.bookings);

  }

  openBookingDetail(id) {
    this.router.navigate(['/booking-detail'], { queryParams: { bookingId: this.cryptoService.set('06052000', id) } })
  }

  getPaginatorData(event: PageEvent) {
    this.bookingService.getAllBookingPage(event.pageIndex, event.pageSize).pipe(first()).subscribe(
      rs => {
        this.bookings = rs['data']['items']
      }
    )
  }

}
