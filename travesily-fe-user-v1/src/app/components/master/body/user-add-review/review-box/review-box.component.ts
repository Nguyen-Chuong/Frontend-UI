import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReviewService} from "../../../../../_services/review.service";
import {ReviewRequest} from "../../../../../_models/review-request";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-review-box',
  templateUrl: './review-box.component.html',
  styleUrls: ['./review-box.component.scss']
})
export class ReviewBoxComponent implements OnInit {
  form: FormGroup
  @Input() bookingId: number

  constructor(private fb: FormBuilder,
    private reviewService: ReviewService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      cleanliness: [0, [Validators.required, Validators.min(1)]],
      facilities: [0, [Validators.required, Validators.min(1)]],
      location: [0, [Validators.required, Validators.min(1)]],
      service: [0, [Validators.required, Validators.min(1)]],
      valueMoney: [0, [Validators.required, Validators.min(1)]],
      reviewTitle: ['', []],
      reviewDetail: ['', []],
    })
  }

  submit() {
    const val = this.form.value
    if (val.cleanliness
      && val.facilities
      && val.location
      && val.service
      && val.valueMoney) {
      const reviewRequest = new ReviewRequest()
      reviewRequest.userBookingId = this.bookingId
      reviewRequest.service = val.service
      reviewRequest.cleanliness = val.cleanliness
      reviewRequest.facilities = val.facilities
      reviewRequest.location = val.location
      reviewRequest.valueForMoney = val.valueMoney
      reviewRequest.reviewTitle = val.reviewTitle
      reviewRequest.reviewDetail = val.reviewDetail
      this.reviewService.addReview(reviewRequest).subscribe({
        next: value => {
          Swal.fire('Thank you for reviewing! Your review has been recorded!', '', 'success').then(() => {
            this.router.navigate(['/user/bookings'], {queryParams: {status: 2}})
          })
        },
        error: err => {
          Swal.fire('You have already reviewed this booking!', '', 'error')
        }
      })
    }
  }
}
