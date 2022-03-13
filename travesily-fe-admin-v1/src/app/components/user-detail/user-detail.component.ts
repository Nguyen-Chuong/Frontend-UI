import { FeedbackService } from 'src/app/_services/feedback.service';
import { Feedback } from './../../_models/feedback';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Booking } from 'src/app/_models/booking';
import { BookingService } from 'src/app/_services/booking.service';
import { CryptoService } from 'src/app/_services/crypto.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  bookings: Booking[]
  feedbacks: Feedback[]
  username: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private feedbackService : FeedbackService,
    private cryptoService: CryptoService
    ) {
    this.route.queryParams.subscribe((param) =>{
      this.username = param['username'].slice(1, -1);
    })

  }

  ngOnInit(): void {

    this.bookingService.getUserBooking(this.username).pipe(first()).subscribe(
      rs => {
        this.bookings = rs['data']
      }
    )
    this.feedbackService.getFeedbackByName(this.username).pipe(first()).subscribe(
      rs => {
        this.feedbacks = rs['data']
      }
    )
  }

}
