import { FeedbackService } from 'src/app/_services/feedback.service';
import { Feedback } from './../../_models/feedback';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Booking } from 'src/app/_models/booking';
import { BookingService } from 'src/app/_services/booking.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  bookings: Booking[]
  feedbacks: Feedback[]
  username: string
  isNoData = false
  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private feedbackService: FeedbackService) {
    this.route.queryParams.subscribe((param) => {
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
        if (!this.feedbacks || this.feedbacks.length === 0)

          this.isNoData = true
        else
          this.isNoData = false
      }
    )
  }
}
