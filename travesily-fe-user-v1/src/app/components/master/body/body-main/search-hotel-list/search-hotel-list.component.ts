import {Component, OnInit} from '@angular/core';
import {first} from "rxjs";
import {HotelService} from "../../../../../_services/hotel.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Hotel} from "../../../../../_models/hotel";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {LocationService} from "../../../../../_services/location.service";
import {District} from "../../../../../_models/district";
import {DatePipe} from "@angular/common";
import {StorageService} from "../../../../../_services/storage.service";
import {RatingAverage} from "../../../../../_models/rating-average";
import {PageEvent} from "@angular/material/paginator";
import {SearchFilter} from "../../../../../_models/search-filter";

@Component({
  selector: 'app-search-hotel-list',
  templateUrl: './search-hotel-list.component.html',
  styleUrls: ['./search-hotel-list.component.scss']
})
export class SearchHotelListComponent implements OnInit {
  hotels: Hotel[]
  districts: District[]
  isPriceLowToHigh: boolean = null
  isRatingLowToHigh: boolean = null
  isReviewLowToHigh: boolean = null
  isDealLowToHigh: boolean = null
  filter: SearchFilter = new SearchFilter()
  pageSize: number = 0
  hotelForm = new FormGroup({
    destination: new FormControl('abc', [Validators.required]),
    from: new FormControl(new Date(), [Validators.required]),
    to: new FormControl(new Date(), [Validators.required]),
    guestNumber: new FormControl(0, [Validators.required, Validators.min(1)]),
    roomNumber: new FormControl(0, [Validators.required, Validators.min(1)])
  })

  constructor(private hotelService: HotelService,
              private activatedRoute: ActivatedRoute,
              private locationService: LocationService,
              private router: Router,
              private storageService: StorageService
  ) {
    this.filter = this.storageService.searchFilter
    hotelService.searchHotel(this.filter.destination.id, this.filter.from, this.filter.to, this.filter.guestNumber, this.filter.roomNumber, 0, 5)
      .subscribe({
        next: rs => {
          this.hotels = rs['data']['items']
          this.pageSize = rs['data']['pageSize']
        },
        error: err => {
          console.log(err)
        }}
      )


  }

  ngOnInit(): void {
  }

  search() {
    const val = this.hotelForm.value
    if (val.destination, val.from, val.to, val.guestNumber, val.roomNumber) {
      const district = this.districts.filter(rs => rs.nameDistrict === val.destination)[0]
      if (district !== null) {
        this.router.navigate(['/main/search-hotel-list'], {
          queryParams: {
            destination: district.id,
            from: val.from,
            to: val.to,
            guestNumber: val.guestNumber,
            roomNumber: val.roomNumber
          }
        })
      }
    }
  }

  onSearchHotelChange($event) {
    this.locationService.searchDistrict((<HTMLInputElement>$event.target).value).pipe(first()).subscribe(
      rs => {
        this.districts = rs['data']
      }
    )
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }

  calcAvgRating(rating: RatingAverage) {
    return (rating.averageService + rating.averageCleanliness + rating.averageFacilities + rating.averageLocation + rating.averageValueForMoney) / 5 * 2
  }

  sortHotels(token: boolean, sortBy: string) {
    this.hotels.sort((n1, n2) => {
      if (n1[sortBy] > n2[sortBy])
        return token ? 1 : -1
      if (n1[sortBy] < n2[sortBy])
        return token ? -1 : 1
      return 0
    })
  }

  setNull() {
    this.isPriceLowToHigh = null
    this.isRatingLowToHigh = null
    this.isReviewLowToHigh = null
    this.isDealLowToHigh = null
  }

  togglePrice() {
    if (this.isPriceLowToHigh === null) {
      this.setNull()
      this.isPriceLowToHigh = false
    }
    this.isPriceLowToHigh = !this.isPriceLowToHigh
    this.sortHotels(this.isPriceLowToHigh, 'price')
  }

  toggleRating() {
    if (this.isRatingLowToHigh === null) {
      this.setNull()
      this.isRatingLowToHigh = false
    }
    this.isRatingLowToHigh = !this.isRatingLowToHigh
    this.sortHotels(this.isRatingLowToHigh, 'star')
  }

  toggleReview() {
    if (this.isReviewLowToHigh === null) {
      this.setNull()
      this.isReviewLowToHigh = false
    }
    this.isReviewLowToHigh = !this.isReviewLowToHigh
    this.hotels.sort((n1, n2) => {
      if (this.calcAvgRating(n1.rating) > this.calcAvgRating(n2.rating))
        return this.isReviewLowToHigh ? 1 : -1
      if (this.calcAvgRating(n1.rating) < this.calcAvgRating(n2.rating))
        return this.isReviewLowToHigh ? -1 : 1
      return 0
    })
  }

  toggleHotDeal() {
    if (this.isDealLowToHigh === null) {
      this.setNull()
      this.isDealLowToHigh = false
    }
    this.isDealLowToHigh = !this.isDealLowToHigh
    this.sortHotels(this.isDealLowToHigh, 'salePercent')
  }

  getPaginatorData(event: PageEvent) {
    this.hotelService.searchHotel(this.filter.destination.id, this.filter.from, this.filter.to, this.filter.guestNumber, this.filter.roomNumber, event.pageIndex, event.pageSize)
      .pipe(first())
      .subscribe(
        rs => {
          this.hotels = rs['data']['items']
        },
        error => {
          console.log(error)
        }
      )
  }
}
