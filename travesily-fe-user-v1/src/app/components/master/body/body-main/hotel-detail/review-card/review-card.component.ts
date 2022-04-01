import { Component, OnInit, Input } from '@angular/core';
import {Review} from "../../../../../../_models/review";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit {
  @Input() review: Review
  ratingTitle: string = ''
  constructor() { }

  ngOnInit(): void {
    const avgRating = this.calcAvgRatingReview(this.review)
    if (avgRating >= 9)
      this.ratingTitle = 'Exceptional'
    else if (avgRating < 9 && avgRating >= 8)
      this.ratingTitle = 'Very good'
    else if (avgRating < 8 && avgRating >= 7)
      this.ratingTitle = 'Good'
    else if (avgRating < 7 && avgRating >= 5)
      this.ratingTitle = 'Average'
    else if (avgRating < 5)
      this.ratingTitle = 'Below Average'
  }

  calcAvgRatingReview(review: Review) {
    return (review?.service + review?.cleanliness + review?.facilities + review?.location + review?.valueForMoney) / 5 * 2
  }

}
