import {Component, OnInit} from '@angular/core';
import {Booking} from "../../../../../_models/booking";
import {BookingService} from "../../../../../_services/booking.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent implements OnInit {
  bookings: Booking[] = []
  status: number
  navItems = [
    {id: 'upcoming', name: 'Upcoming'},
    {id: 'completed', name: 'Completed'},
    {id: 'cancelled', name: 'Cancelled'},
  ]

  constructor(private bookingService: BookingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService) {
    this.activatedRoute.queryParams.subscribe({
      next: params => {
        this.spinner.show();
        if (params['status'] == undefined) {
          const queryParams: Params = {status: 1};
          this.router.navigate(
            [],
            {
              relativeTo: activatedRoute,
              queryParams: queryParams,
              queryParamsHandling: 'merge', // remove to replace all query params by provided
            });
          this.status = 1
        } else {
          this.status = params['status']
        }
        this.bookingService.getBookingByStatus(this.status).subscribe({
          next: value => {
            this.bookings = value['data']
            this.sortBookings(params['sort'])
            // if loaded, hide it
            if(value){
              this.spinner.hide()
            }
          }
        })
      }
    })
  }

  ngOnInit(): void {
  }

  sortBookings(sortType: string) {
    if (sortType === 'check-in-date') {
      this.bookings.sort((b1, b2) => {
        return new Date(b1.checkIn).getTime() - new Date(b2.checkIn).getTime()
      })
    } else if (sortType === 'booking-date') {
      this.bookings.sort((b1, b2) => {
        return new Date(b1.bookingDate).getTime() - new Date(b2.bookingDate).getTime()
      })
    } else if (sortType === 'is-reviewed') {
      this.bookings = this.bookings.filter(booking =>
        booking.reviewStatus === 0
      )
    }
  }
}
