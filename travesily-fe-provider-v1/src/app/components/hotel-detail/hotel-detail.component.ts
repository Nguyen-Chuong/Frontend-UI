import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Booking } from 'src/app/_models/booking';
import { Hotel } from 'src/app/_models/hotel';
import { BookingsService } from 'src/app/_services/bookings.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  hotelId: any
  currentPage: number
  pageSize: number
  pages: any[]
  total: number
  maxpage: number
  bookings: Booking[]
  dataSource
  isAdmin = false
  constructor(private bookingsService: BookingsService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.pageSize = 5
    this.route.queryParams.subscribe((param) => {
      if (param['page'] === undefined) {
        this.currentPage = 0
      }else{
        this.currentPage = param['page']
      }
      this.hotelId = param['id'].slice(1, -1);
    })

    this.bookingsService.getAllBookingOfHotel(this.hotelId).pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
        this.maxpage = this.total / this.pageSize
        if (this.total % this.pageSize != 0) {
          this.maxpage++
        }
        console.log(this.total)
        this.pages = Array.from({ length: this.maxpage }, (_, i) => i + 1)
      }
    )
    this.bookingsService.getBookingOfHotel(this.hotelId, this.currentPage, this.pageSize).pipe(first()).subscribe(
      rs => {
        this.bookings = rs['data']['items']

      }
    )
  }

}
