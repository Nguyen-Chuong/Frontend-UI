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

  constructor(private hotelsService: HotelService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.hotelId = param['id'].slice(1, -1);
    })
    this.hotelsService.getHotelById(this.hotelId).pipe(first()).subscribe(
      rs => {
        this.hotel = rs['data']
        this.url = this.hotel.avatar
        this.name = this.hotel.name
      }
    )
    this.hotelsService.getRoomByHotelId(this.hotelId).pipe(first()).subscribe(
      rs => {
        this.rooms = rs['data']
      }
    )
  }
}
