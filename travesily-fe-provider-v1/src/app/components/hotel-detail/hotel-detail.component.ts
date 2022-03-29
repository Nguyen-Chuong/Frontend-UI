import { Review } from './../../_models/review';
import { ReviewsService } from './../../_services/reviews.service';
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
  maxPage: number
  bookings: Booking[]
  reviews: Review[]
  upComingBookings: Booking[]
  constructor(private bookingsService: BookingsService,
    private reviewsService: ReviewsService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.pageSize = 5
    this.currentPage = 0
    this.route.queryParams.subscribe((param) => {
      this.hotelId = param['id'].slice(1, -1);
    })

    this.bookingsService.getAllBookingUpComingOfHotel(this.hotelId).pipe(first()).subscribe(
      rs => {
        this.upComingBookings = rs['data']['items']

      })
    this.reviewsService.getAllReviewOfHotel(this.hotelId).pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
        this.maxPage = this.total / this.pageSize
        if (this.total % this.pageSize != 0) {
          this.maxPage++
        }
        console.log(this.total)
        this.pages = Array.from({ length: this.maxPage }, (_, i) => i + 1)

      }
    )

    this.reviewsService.getReviewOfHotel(this.hotelId, this.currentPage, this.pageSize).pipe(first()).subscribe(
      rs => {
        this.reviews = rs['data']['items']

      }
    )
  }

  changePage(page: number){
    this.currentPage = page - 1
    this.reviewsService.getReviewOfHotel(this.hotelId, this.currentPage, this.pageSize).pipe(first()).subscribe(
      rs => {
        this.reviews = rs['data']['items']
      }
    )
  }

  previousPage() {
    this.currentPage = this.currentPage - 1
    this.reviewsService.getReviewOfHotel(this.hotelId, this.currentPage, this.pageSize).pipe(first()).subscribe(
      rs => {
        this.reviews = rs['data']['items']
      }
    )
  }

  nextPage() {
    this.currentPage = this.currentPage + 1
    this.reviewsService.getReviewOfHotel(this.hotelId, this.currentPage, this.pageSize).pipe(first()).subscribe(
      rs => {
        this.reviews = rs['data']['items']
      }
    )
  }

}
