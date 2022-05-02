import { Review } from './../../_models/review';
import { ReviewsService } from './../../_services/reviews.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Booking } from 'src/app/_models/booking';
import { BookingsService } from 'src/app/_services/bookings.service';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  hotelId: any
  pageSize: number = 0
  pages: any[]
  total: number
  bookings: Booking[] = []
  reviews: Review[] = []
  upComingBookings: Booking[] = []
  cancelList: Booking[] = []
  criteria: number = 1
  constructor(private bookingsService: BookingsService,
    private reviewsService: ReviewsService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    /** spinner starts on init */
    this.spinner.show();
    this.route.queryParams.subscribe((param) => {
      this.hotelId = param['id'].slice(1, -1);
    })
    this.reviewsService.getAllReviewOfHotel(this.hotelId, this.criteria).pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']
      }, err => {
        console.log(err)
      }
    )

    this.bookingsService.getAllBookingUpComingOfHotel(this.hotelId).pipe(first()).subscribe(
      rs => {
        this.upComingBookings = rs['data']['items']
      })

    this.bookingsService.getAllBookingCancelOfHotel(this.hotelId).pipe(first()).subscribe(
      rs => {
        this.cancelList = rs['data']['items']
      })

    this.reviewsService.getReviewOfHotel(this.hotelId, 0, 5, this.criteria).pipe(first()).subscribe(
      rs => {
        this.reviews = rs['data']['items']
        this.pageSize = rs['data']['pageSize']       
        // check if data is loaded, hide it
        if(rs){
          this.spinner.hide();
        }
      }
    )
  }

  getPaginatorData(event: PageEvent) {
    this.reviewsService.getReviewOfHotel(this.hotelId, event.pageIndex, event.pageSize, this.criteria).pipe(first()).subscribe(
      rs => {
        this.reviews = rs['data']['items']
      }
    )
  }
}
