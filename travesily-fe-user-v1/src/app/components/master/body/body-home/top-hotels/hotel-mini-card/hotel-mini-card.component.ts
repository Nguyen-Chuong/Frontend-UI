import {Component, Input, OnInit} from '@angular/core';
import {Hotel} from "../../../../../../_models/hotel";
import {Router} from "@angular/router";
import {CryptoService} from "../../../../../../_services/crypto.service";
import {StorageService} from "../../../../../../_services/storage.service";
import {SearchFilter} from "../../../../../../_models/search-filter";
import {District} from "../../../../../../_models/district";

@Component({
  selector: 'app-hotel-mini-card',
  templateUrl: './hotel-mini-card.component.html',
  styleUrls: ['./hotel-mini-card.component.scss']
})
export class HotelMiniCardComponent implements OnInit {
  @Input() hotel: Hotel

  constructor(private router: Router, private cryptoService: CryptoService, private storageService: StorageService) {
  }

  ngOnInit(): void {
  }

  redirectHotelDetail() {
    const defaultFilter = new SearchFilter()
    const today = new Date()
    defaultFilter.from = new Date(today.setDate(today.getDate() + 1))
    defaultFilter.to = new Date(today.setDate(today.getDate() + 1))
    defaultFilter.guestNumber = 2
    defaultFilter.roomNumber = 1
    defaultFilter.destination = {
      id: this.hotel.district.id,
      resultSearch: `${this.hotel.district.nameDistrict} District, ${this.hotel.district.city.nameCity}`
    }
    this.storageService.searchFilter = defaultFilter
    this.router.navigate(['/main/hotel-detail'], {
      queryParams: {
        hotelId: this.cryptoService.set('06052000', this.hotel.id)
      }
    })
  }
}
