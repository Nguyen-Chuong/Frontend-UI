import {Component, Input, OnInit} from '@angular/core';
import {Hotel} from "../../../../../../_models/hotel";
import {RatingAverage} from "../../../../../../_models/rating-average";
import {Review} from "../../../../../../_models/review";

@Component({
  selector: 'app-hotel-rating',
  templateUrl: './hotel-rating.component.html',
  styleUrls: ['./hotel-rating.component.scss']
})
export class HotelRatingComponent implements OnInit {
  @Input() hotel: Hotel

  ratingTitle: string = ''
  constructor() { }

  ngOnInit(): void {
  }

  calcAvgRating(rating: RatingAverage) {
    return (rating?.averageService + rating?.averageCleanliness + rating?.averageFacilities + rating?.averageLocation + rating?.averageValueForMoney) / 5 * 2
  }

  calcAvgRatingReview(review: Review) {
    return (review?.service + review?.cleanliness + review?.facilities + review?.location + review?.valueForMoney) / 5 * 2
  }
}
