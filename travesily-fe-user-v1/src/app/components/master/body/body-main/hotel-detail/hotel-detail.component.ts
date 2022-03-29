import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoomTypeService} from "../../../../../_services/room-type.service";
import {RoomType} from "../../../../../_models/room-type";
import {Hotel} from "../../../../../_models/hotel";
import {HotelService} from "../../../../../_services/hotel.service";
import {Benefit} from "../../../../../_models/benefit";
import {BenefitType} from "../../../../../_models/benefit-type";
import {StorageService} from "../../../../../_services/storage.service";
import {RatingAverage} from "../../../../../_models/rating-average";
import {Review} from "../../../../../_models/review";

declare var $:any;


@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  roomTypes: RoomType[] = []
  hotel: Hotel = new Hotel()
  benefitTypes: BenefitType[]
  listImage: { id: number, src: string }[] = []
  currentUrl = ''
  ratingTitle: string = ''

  constructor(private activatedRoute: ActivatedRoute,
              private roomTypeService: RoomTypeService,
              private hotelService: HotelService,
              private router: Router,
              private storageService: StorageService
  ) {
    this.currentUrl = this.router.url
  }

  ngOnInit(): void {
    $('[data-toggle="popover"]').popover({trigger:"manual",container: 'body',placement:"bottom",sanitize: false ,html : true,content: function() {
        var content = $(this).attr("data-bs-content");
        return $(content).children(".popover-body").html();
      }}).on('mouseenter', function () {
      var self = this;
      $(this).popover("show");
      $(".popover").on('mouseleave', function () {
        $(self).popover('hide');
      });
    })

    $(document).on("click","a",function(e){
      e.preventDefault();
      var id = $(this).attr("href"),
        topSpace = 30;
      $('html, body').animate({
        scrollTop: $(id).offset().top - topSpace
      }, 100);
    });
    //   .on('mouseleave', function () {
    //   var self = this;
    //   setTimeout(function () {
    //     if (!$('.popover:hover').length) {
    //       $(self).popover('hide');
    //     }
    //   }, 3000);
    // });
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
          }

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

}
