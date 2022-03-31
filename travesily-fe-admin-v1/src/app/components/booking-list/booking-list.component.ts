import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
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
  currentPage: number
  pageSize: number
  pages: any[]
  total: number
  maxpage: number
  constructor(private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute,
    private cryptoService: CryptoService) {
  }
  displayedColumns: string[] = ['id', 'username', 'hotel', 'checkIn', 'checkOut', 'status'];

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.currentPage = param['page']
      this.pageSize = param['size']
    })

    this.bookingService.getAllBooking().pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
        this.maxpage = this.total / this.pageSize
        if (this.total % this.pageSize != 0) {
          this.maxpage++
        }
        this.pages = Array.from({ length: this.maxpage }, (_, i) => i + 1)
      }
    )
    this.bookingService.getAllBookingPage(this.currentPage, this.pageSize).pipe(first()).subscribe(
      rs => {
        this.bookings = rs['data']['items']

      }
    )


    this.dataSource = new MatTableDataSource<Booking>(this.bookings);

  }

  openBookingDetail(id) {
    this.router.navigate(['/user/booking-detail'], { queryParams: { bookingId: this.cryptoService.set('06052000', id) } })

  }

  openPage(page) {
    this.router.navigate(['booking'], {
      queryParams: { page: JSON.stringify(page - 1), size: JSON.stringify(Number(this.pageSize)) }
    });
  }

}
