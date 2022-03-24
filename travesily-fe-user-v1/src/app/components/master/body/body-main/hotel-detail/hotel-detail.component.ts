import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoomTypeService} from "../../../../../_services/room-type.service";
import {RoomType} from "../../../../../_models/room-type";
import {Hotel} from "../../../../../_models/hotel";
import {HotelService} from "../../../../../_services/hotel.service";
import {Benefit} from "../../../../../_models/benefit";
import {BenefitType} from "../../../../../_models/benefit-type";
import {StorageService} from "../../../../../_services/storage.service";

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

  constructor(private activatedRoute: ActivatedRoute,
              private roomTypeService: RoomTypeService,
              private hotelService: HotelService,
              private router: Router,
              private storageService: StorageService
  ) {
    this.currentUrl = this.router.url
  }

  ngOnInit(): void {
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

}
