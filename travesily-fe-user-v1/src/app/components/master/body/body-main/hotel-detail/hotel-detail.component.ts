import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RoomTypeService} from "../../../../../_services/room-type.service";
import {RoomType} from "../../../../../_models/room-type";
import {Hotel} from "../../../../../_models/hotel";
import {HotelService} from "../../../../../_services/hotel.service";
import {Benefit} from "../../../../../_models/benefit";
import {BenefitType} from "../../../../../_models/benefit-type";

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  roomTypes: RoomType[] = []
  hotel: Hotel = new Hotel()
  benefitTypes: BenefitType[]

  constructor(private activatedRoute: ActivatedRoute,
              private roomTypeService: RoomTypeService,
              private hotelService: HotelService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      rs => {
        const hotelId = rs['hotelId']
        const from = rs['from']
        const to = rs['to']
        this.roomTypeService.getRoomTypesByHotelId(hotelId, from, to).subscribe(
          rs => {
            this.roomTypes = rs['data']
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
