import {Component, Input, OnInit} from '@angular/core';
import {Hotel} from "../../../../../../_models/hotel";
import {first} from "rxjs";
import {HotelService} from "../../../../../../_services/hotel.service";
import {Router} from "@angular/router";
import {CryptoService} from "../../../../../../_services/crypto.service";
import {Benefit} from "../../../../../../_models/benefit";
import {BenefitType} from "../../../../../../_models/benefit-type";
import {RatingAverage} from "../../../../../../_models/rating-average";
import {Review} from "../../../../../../_models/review";

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {
  @Input() hotel: Hotel
  benefits: Benefit[] = []
  ratingTitle: string = ''

  constructor(private hotelService: HotelService,
              private router: Router,
              private cryptoService: CryptoService) {
  }

  ngOnInit(): void {
    this.hotelService.listBenefitsByHotelId(this.cryptoService.set('06052000', this.hotel.id)).pipe(first()).subscribe(
      rs => {
        const benefitTypes: BenefitType[] = rs['data'] ? rs['data'] : []
        benefitTypes.forEach(rs => {
          rs.benefits.forEach(rs => {
            this.benefits.push(rs)
          })
        })
      }
    )
    const avgRating = this.calcAvgRating(this.hotel.rating)
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

  selectRoom() {
    this.router.navigate(['/main/hotel-detail'], {
      queryParams: {
        hotelId: this.cryptoService.set('06052000', this.hotel.id)
      }
    })
  }

  calcAvgRating(rating: RatingAverage) {
    return (rating.averageService + rating.averageCleanliness + rating.averageFacilities + rating.averageLocation + rating.averageValueForMoney) / 5 * 2
  }

  calcAvgRatingReview(review: Review) {
    return (review.service + review.cleanliness + review.facilities + review.location + review.valueForMoney) / 5 * 2
  }
}
