import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Hotel } from 'src/app/_models/hotel';
import { Room } from 'src/app/_models/room';
import { HotelService } from 'src/app/_services/hotel.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  hotel: Hotel
  hotelId: any
  rooms: Room[]
  url: string
  name: string
  address: string
  nameDistrict: string
  providerName: string
  description: string
  lowestPrice: number

  constructor(private hotelsService: HotelService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.hotelId = param['id'].slice(1, -1);
    })
    this.hotelsService.getHotelById(this.hotelId).pipe(first()).subscribe(
      rs => {
        this.hotel = rs['data']
        if (this.hotel.avatar)
          this.url = this.hotel.avatar
        else
          this.url = 'https://ezcloud.vn/wp-content/uploads/2019/07/Halong.jpg'
        this.name = this.hotel.name
        this.address = this.hotel.address
        this.nameDistrict = this.hotel.district.nameDistrict
        this.providerName = this.hotel.provider.providerName
        this.description = this.hotel.description
      }
    )
    this.hotelsService.getRoomByHotelId(this.hotelId).pipe(first()).subscribe(
      rs => {
        this.rooms = rs['data']
      }
    )
  }
}
