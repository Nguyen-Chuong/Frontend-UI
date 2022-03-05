import {Component, OnInit} from '@angular/core';
import {first} from "rxjs";
import {HotelService} from "../../../../../_services/hotel.service";
import {ActivatedRoute} from "@angular/router";
import {Hotel} from "../../../../../_models/hotel";

@Component({
  selector: 'app-search-hotel-list',
  templateUrl: './search-hotel-list.component.html',
  styleUrls: ['./search-hotel-list.component.scss']
})
export class SearchHotelListComponent implements OnInit {
  hotels: Hotel[]

  constructor(private hotelService: HotelService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(
      rs => {
        const destination = rs['destination']
        const from = rs['from']
        const to = rs['to']
        const guestNumber = rs['guestNumber']
        const roomNumber = rs['roomNumber']
        hotelService.searchHotel(destination, from, to, guestNumber, roomNumber, 0, 10)
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
    )

  }

  ngOnInit(): void {
  }

}
