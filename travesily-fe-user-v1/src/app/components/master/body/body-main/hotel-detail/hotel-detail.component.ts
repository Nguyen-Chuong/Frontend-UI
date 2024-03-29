import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoomTypeService} from "../../../../../_services/room-type.service";
import {RoomType} from "../../../../../_models/room-type";
import {Hotel} from "../../../../../_models/hotel";
import {HotelService} from "../../../../../_services/hotel.service";
import {BenefitType} from "../../../../../_models/benefit-type";
import {StorageService} from "../../../../../_services/storage.service";
import {RatingAverage} from "../../../../../_models/rating-average";
import {Review} from "../../../../../_models/review";
import {ReviewService} from "../../../../../_services/review.service";
import {CryptoService} from "../../../../../_services/crypto.service";
import {PageEvent} from "@angular/material/paginator";
import {NgxSpinnerService} from "ngx-spinner";

declare var $: any;

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit, OnDestroy {
  roomTypes: RoomType[] = []
  hotel: Hotel = new Hotel()
  benefitTypes: BenefitType[]
  listImage: { id: number, src: string }[] = []
  currentUrl = ''
  ratingTitle: string = ''
  reviews: Review[] = []
  totalItems: number = 0
  currentPageIndex: number
  currentPageSize: number
  currentCriteria: number

  constructor(private activatedRoute: ActivatedRoute,
    private roomTypeService: RoomTypeService,
    private hotelService: HotelService,
    private router: Router,
    private storageService: StorageService,
    private reviewService: ReviewService,
    private cryptoService: CryptoService,
    private spinner: NgxSpinnerService
  ) {
    this.currentUrl = this.router.url
  }

  ngOnDestroy(): void {
    $('[data-toggle="popover"]').popover("hide")
  }

  ngOnInit(): void {
    /** spinner starts on init */
    this.spinner.show();
    $('[data-toggle="popover"]').popover({
      trigger: "manual", container: 'body', placement: "bottom", sanitize: false, html: true, content: function () {
        var content = $(this).attr("data-bs-content");
        return $(content).children(".popover-body").html();
      }
    }).on('mouseenter', function () {
      var self = this;
      $(this).popover("show");
      $(".popover").on('mouseleave', function () {
        $(self).popover('hide');
      });
    }).on('mouseleave', function () {
      $(this).popover("hide");
    })
    $(document).on("click", ".hotel-nav-link", function (e) {
      e.preventDefault();
      var id = $(this).attr("href"),
        topSpace = 30;
      $('html, body').animate({
        scrollTop: $(id).offset().top - topSpace
      }, 100);
    })

    this.activatedRoute.queryParams.subscribe(
      rs => {
        const hotelId = rs['hotelId']
        const filter = this.storageService.searchFilter
        this.roomTypeService.getRoomTypesByHotelId(hotelId, filter.from, filter.to).subscribe({
            next: rs => {
              this.roomTypes = rs['data']['listRooms']
              this.roomTypes.forEach(roomType => {
                this.listImage?.push(...roomType.listImage)
              })
            }
          }
        )
        this.hotelService.getHotelById(hotelId).subscribe(
          rs => {
            this.hotel = rs['data']
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
              this.currentPageIndex = 0
              this.currentPageSize = 5
              this.currentCriteria = 1
              this.reviewService.getReviews(this.cryptoService.set('06052000', this.hotel.id), this.currentPageIndex, this.currentPageSize, this.currentCriteria).subscribe({
              next: reviews => {
                this.reviews = reviews['data']['items']
                this.totalItems = reviews['data']['total']
              }
            })
            if (rs) {
              this.spinner.hide();
            }
          },
          err => console.error(err)
        )
        this.hotelService.listBenefitsByHotelId(hotelId).subscribe(
          rs => {
            this.benefitTypes = rs['data']
          }
        )
      }
    )
  }

  calcAvgRating(rating: RatingAverage) {
    return (rating?.averageService + rating?.averageCleanliness + rating?.averageFacilities + rating?.averageLocation + rating?.averageValueForMoney) / 5 * 2
  }

  calcAvgRatingReview(review: Review) {
    return (review?.service + review?.cleanliness + review?.facilities + review?.location + review?.valueForMoney) / 5 * 2
  }

  filterReviews(event: Event) {
    if (event.target['value'] == 1) {
      this.currentCriteria = 1
      this.reviewService.getReviews(this.cryptoService.set('06052000', this.hotel.id), this.currentPageIndex, this.currentPageSize, this.currentCriteria).subscribe({
        next: reviews => {
          this.reviews = reviews['data']['items']
        }
      })
    } else if (event.target['value'] == 2) {
      this.currentCriteria = 2
      this.reviewService.getReviews(this.cryptoService.set('06052000', this.hotel.id), this.currentPageIndex, this.currentPageSize, this.currentCriteria).subscribe({
        next: reviews => {
          this.reviews = reviews['data']['items']
        }
      })
    } else if (event.target['value'] == 3) {
      this.currentCriteria = 3
      this.reviewService.getReviews(this.cryptoService.set('06052000', this.hotel.id), this.currentPageIndex, this.currentPageSize, this.currentCriteria).subscribe({
        next: reviews => {
          this.reviews = reviews['data']['items']
        }
      })
    }
  }

  getPaginatorData(event: PageEvent) {
    this.currentPageIndex = event.pageIndex
    this.currentPageSize = event.pageSize
    this.reviewService.getReviews(this.cryptoService.set('06052000', this.hotel.id), event.pageIndex, event.pageSize, this.currentCriteria).subscribe({
      next: reviews => {
        this.reviews = reviews['data']['items']
      }
    })
  }

  redirectLocation() {
    // window.open('http://www.google.com/maps/search/?api=1&query=21.0398002,105.7640714')
    window.open(`http://www.google.com/maps/place/${this.hotel.address},${this.hotel.district?.nameDistrict},${this.hotel?.district.city.nameCity}`)
  }
}
