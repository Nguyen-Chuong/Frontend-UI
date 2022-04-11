import { Component, OnInit } from '@angular/core';
import {HotelService} from "../../../../../_services/hotel.service";
import {CryptoService} from "../../../../../_services/crypto.service";
import {Hotel} from "../../../../../_models/hotel";

@Component({
  selector: 'app-top-hotels',
  templateUrl: './top-hotels.component.html',
  styleUrls: ['./top-hotels.component.scss']
})
export class TopHotelsComponent implements OnInit {
  hotels: Hotel[] = []
  constructor(private hotelService: HotelService,
    private cryptoService: CryptoService) {
    this.hotelService.getTopHotel(this.cryptoService.set('06052000',8)).subscribe({
      next: value => {
        this.hotels = value['data']
      }
    })
  }

  ngOnInit(): void {
  }
}
