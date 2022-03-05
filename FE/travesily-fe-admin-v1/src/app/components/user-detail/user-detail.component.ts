import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { first } from 'rxjs';
import { Account } from 'src/app/_models/account';
import { Booking } from 'src/app/_models/booking';
import { BookingService } from 'src/app/_services/booking.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  account: Account
  bookings: Booking[]
  userId

  constructor(private router: Router,
    private route: ActivatedRoute, private bookingService: BookingService) {
    this.route.queryParams.subscribe((param) =>{
      this.userId = param['id']
    })
    this.bookingService.getUserBooking(this.userId).pipe(first()).subscribe(
      rs => {
        this.bookings = rs['data']
      }
    )
  }

  ngOnInit(): void {
  }

}
